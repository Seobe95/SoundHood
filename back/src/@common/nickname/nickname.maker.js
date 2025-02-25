"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NicknameMaker = void 0;
var NicknameMaker = /** @class */ (function () {
    function NicknameMaker() {
        this.instruments = [
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
        this.acts = ['치는', '두드리는', '흔드는', '건드리는', '때리는', '뜯는', '만지는'];
        this.names = [
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
    }
    NicknameMaker.prototype.random = function (arr) {
        var length = arr.length;
        var index = Math.floor(Math.random() * length);
        return arr[index];
    };
    NicknameMaker.prototype.make = function () {
        var instruments = this.random(this.instruments);
        var act = this.random(this.acts);
        var name = this.random(this.names);
        return "".concat(instruments, " ").concat(act, " ").concat(name);
    };
    return NicknameMaker;
}());
exports.NicknameMaker = NicknameMaker;
