interface UserInformation {
  email: string;
  password: string;
}

interface UserRegisterInformation extends UserInformation {
  passwordCheck: string;
}

function validateLogin(values: UserInformation): UserInformation {
  const errors = {
    email: '',
    password: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  } else {
    errors.email = '';
  }

  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/.test(
      values.password,
    )
  ) {
    errors.password =
      '비밀번호는 영문 대소문자, 특수문자, 숫자로 구성되어야 합니다.';
  } else {
    errors.password = '';
  }

  return errors;
}

function validateRegister(
  values: UserRegisterInformation,
): UserRegisterInformation {
  const errors = {
    email: '',
    password: '',
    passwordCheck: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  } else {
    errors.email = '';
  }

  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/.test(
      values.password,
    )
  ) {
    errors.password =
      '비밀번호는 영문 대소문자, 특수문자, 숫자로 구성되어야 합니다.';
  } else {
    errors.password = '';
  }

  if (values.password !== values.passwordCheck) {
    errors.passwordCheck = '비밀번호가 일치하지 않습니다.';
  } else {
    errors.passwordCheck = '';
  }

  return errors;
}

export { validateLogin, validateRegister };