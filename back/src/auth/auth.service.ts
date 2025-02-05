import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { NicknameMaker } from '../@common/nickname/nickname.maker';
import { EditProfileDto } from './dto/edit-profile.dto';
import axios from 'axios';
import appleSignInAuth, {
  AppleAuthorizationTokenResponseType,
} from 'apple-signin-auth';
import { KakaoLoginResponse } from 'src/@common/types/kakaoLoginTypes';
import { Post } from 'src/post/post.entity';
import { Like } from 'src/like/like.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Like) private likeRepository: Repository<Like>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  nicknameMaker = new NicknameMaker();

  private async checkNicknameDuplication(): Promise<string> {
    let nickname: string;
    let isDuplicate: boolean;

    do {
      nickname = this.nicknameMaker.make();
      isDuplicate =
        (await this.userRepository.findOne({ where: { nickname } })) !== null;
    } while (isDuplicate);

    return nickname;
  }

  async signup(authDto: AuthDto) {
    const { email, password } = authDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const nickname = await this.checkNicknameDuplication();

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      loginType: 'email',
      nickname: nickname,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('이미 존재하는 이메일입니다.');
      }

      throw new InternalServerErrorException(
        '회원가입 도중 에러가 발생했습니다.',
      );
    }
  }

  async signin(authDto: AuthDto) {
    const { email, password } = authDto;
    const user = await this.userRepository.findOneBy({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    const { accessToken, refreshToken } = await this.getTokens({ email });
    await this.updateHashedRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async kakaoSignIn(kakaoToken: { token: string }) {
    try {
      const { token } = kakaoToken;
      const response = await axios
        .get<KakaoLoginResponse>('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        })
        .catch((error) => {
          console.log(error);
          throw new UnauthorizedException(
            '카카오 로그인이 실패했습니다. 다시 한 번 시도하세요.',
          );
        });

      const email = String(response.data.id);
      const existingUser = await this.userRepository.findOneBy({ email });

      if (existingUser) {
        const { accessToken, refreshToken } = await this.getTokens({ email });
        await this.updateHashedRefreshToken(existingUser.id, refreshToken);
        return { accessToken, refreshToken };
      }

      const nickname = await this.checkNicknameDuplication();

      const newUser = this.userRepository.create({
        email,
        nickname,
        password: '',
        loginType: 'kakao',
      });
      try {
        await this.userRepository.save(newUser);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(
          '회원가입 서버에 문제가 발생했습니다.',
        );
      }

      const { accessToken, refreshToken } = await this.getTokens({ email });
      await this.updateHashedRefreshToken(newUser.id, refreshToken);

      return { accessToken, refreshToken };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '카카오 서버 에러가 발생했습니다.',
      );
    }
  }

  async appleSignIn(appleIdentity: {
    identityToken: string;
    appId: string;
    authorizationCode: string;
  }) {
    try {
      const { appId, identityToken, authorizationCode } = appleIdentity;
      const { sub: userAppleId } = await appleSignInAuth.verifyIdToken(
        identityToken,
        {
          audience: appId,
          ignoreException: true,
        },
      );

      const { refresh_token } =
        await this.getAppleRefreshToken(authorizationCode);

      const existingUser = await this.userRepository.findOneBy({
        email: userAppleId,
      });

      if (existingUser) {
        const { accessToken, refreshToken } = await this.getTokens({
          email: existingUser.email,
        });
        this.updateHashedRefreshToken(existingUser.id, refreshToken);
        return { accessToken, refreshToken };
      }

      const nickname = await this.checkNicknameDuplication();

      const newUser = await this.userRepository.create({
        email: userAppleId,
        nickname,
        password: '',
        loginType: 'apple',
        appleRefreshToken: refresh_token,
      });

      try {
        await this.userRepository.save(newUser);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(
          '회원가입 서버에 문제가 발생했습니다.',
        );
      }

      const { accessToken, refreshToken } = await this.getTokens({
        email: newUser.email,
      });
      this.updateHashedRefreshToken(newUser.id, refreshToken);

      return { accessToken, refreshToken };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Apple 서버 에러가 발생했습니다.');
    }
  }

  private async getAppleRefreshToken(authorizationCode: string) {
    const { clientID, clientSecret } = this.getAppleClientInformation();
    const { data } = await axios.post<AppleAuthorizationTokenResponseType>(
      'https://appleid.apple.com/auth/token',
      null,
      {
        params: {
          client_id: clientID,
          client_secret: clientSecret,
          code: authorizationCode,
          grant_type: 'authorization_code',
        },
      },
    );

    return data;
  }

  private getAppleClientInformation() {
    const privateKey = process.env.APPLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const clientID = process.env.APPLE_CLIENT_ID;

    const clientSecret = appleSignInAuth.getClientSecret({
      clientID,
      teamID: process.env.APPLE_TEAM_ID,
      privateKey: privateKey,
      keyIdentifier: process.env.APPLE_KEY_IDENTIFIER,
    });

    return { clientSecret, clientID };
  }

  private async getTokens(payload: { email: string }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION'),
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async updateHashedRefreshToken(id: string, refreshToken: string) {
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

    try {
      await this.userRepository.update(id, { hashedRefreshToken });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async refreshToken(user: User) {
    const { email } = user;
    const { accessToken, refreshToken } = await this.getTokens({ email });

    if (!user.hashedRefreshToken) {
      throw new ForbiddenException();
    }

    await this.updateHashedRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  getProfile(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, hashedRefreshToken, ...rest } = user;

    return { ...rest };
  }

  async editProfile(editProfileDto: EditProfileDto, user: User) {
    const profile = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: user.id })
      .getOne();

    if (!profile) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }

    const { nickname } = editProfileDto;
    profile.nickname = nickname;

    try {
      await this.userRepository.save(profile);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(
        '프로필 수정 도중 에러가 발생했습니다.',
      );
    }
  }

  async deleteRefreshToken(user: User) {
    try {
      await this.userRepository.update(user.id, { hashedRefreshToken: null });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '로그아웃 도중 에러가 발생했습니다.',
      );
    }
  }

  async deleteAccount(user: User) {
    try {
      const { loginType, appleRefreshToken } =
        await this.userRepository.findOneBy({
          id: user.id,
        });
      if (loginType === 'apple') {
        await this.revokeAppleTokens(appleRefreshToken);
      }
      await this.userRepository.update(user.id, {
        nickname: '탈퇴한 사용자',
        email: `deleted_${user.id}@example.com`,
        password: `password`,
      });
      await this.likeRepository.delete({ user: { id: user.id } });
      await this.userRepository.softDelete(user.id);
    } catch (e) {
      console.error(e);
      throw new BadRequestException(
        '탈퇴할 수 없습니다. 남은 데이터가 존재하는지 확인해주세요.',
      );
    }
  }

  async revokeAppleTokens(appleRefreshToken: string) {
    const { clientID, clientSecret } = this.getAppleClientInformation();

    try {
      await appleSignInAuth.revokeAuthorizationToken(appleRefreshToken, {
        clientID: clientID,
        clientSecret: clientSecret,
        tokenTypeHint: 'refresh_token',
      });
    } catch (e) {
      console.error(e, 'apple revoke fail');
    }
  }
}
