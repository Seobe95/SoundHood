export class NicknameMaker {
  instruments = [
    '기타',
    '베이스',
    '드럼',
    '건반',
    '우클렐레',
    '징',
    '바이올린',
    '꽹가리',
    '트라이앵글',
    '실로폰',
    '탬버린',
    '마이크',
  ];
  acts = ['치는', '두드리는', '흔드는', '건드리는', '때리는', '뜯는', '만지는'];
  names = [
    '김한주',
    '한로로',
    '김건재',
    '최웅희',
    '김춘추',
    '이승윤',
    '윤지영',
    '나상현',
    '윤성현',
    '홍동균',
    '방요셉',
    '윤덕원',
  ];

  private random(arr: string[]): string {
    const length = arr.length;
    const index = Math.floor(Math.random() * length);
    return arr[index];
  }

  make(): string {
    const instruments = this.random(this.instruments);
    const act = this.random(this.acts);
    const name = this.random(this.names);

    return `${instruments} ${act} ${name}`;
  }
}
