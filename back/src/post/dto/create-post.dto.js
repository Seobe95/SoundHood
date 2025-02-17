"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostDto = void 0;
var class_validator_1 = require("class-validator");
var CreatePostDto = function () {
    var _a;
    var _latitude_decorators;
    var _latitude_initializers = [];
    var _latitude_extraInitializers = [];
    var _longitude_decorators;
    var _longitude_initializers = [];
    var _longitude_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _artist_decorators;
    var _artist_initializers = [];
    var _artist_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _spotifyURL_decorators;
    var _spotifyURL_initializers = [];
    var _spotifyURL_extraInitializers = [];
    var _date_decorators;
    var _date_initializers = [];
    var _date_extraInitializers = [];
    var _albumCover_decorators;
    var _albumCover_initializers = [];
    var _albumCover_extraInitializers = [];
    var _nickname_decorators;
    var _nickname_initializers = [];
    var _nickname_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreatePostDto() {
                this.latitude = __runInitializers(this, _latitude_initializers, void 0);
                this.longitude = (__runInitializers(this, _latitude_extraInitializers), __runInitializers(this, _longitude_initializers, void 0));
                this.title = (__runInitializers(this, _longitude_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                this.artist = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _artist_initializers, void 0));
                this.description = (__runInitializers(this, _artist_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.spotifyURL = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _spotifyURL_initializers, void 0));
                this.date = (__runInitializers(this, _spotifyURL_extraInitializers), __runInitializers(this, _date_initializers, void 0));
                this.albumCover = (__runInitializers(this, _date_extraInitializers), __runInitializers(this, _albumCover_initializers, void 0));
                this.nickname = (__runInitializers(this, _albumCover_extraInitializers), __runInitializers(this, _nickname_initializers, void 0));
                __runInitializers(this, _nickname_extraInitializers);
            }
            return CreatePostDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _latitude_decorators = [(0, class_validator_1.IsNotEmpty)()];
            _longitude_decorators = [(0, class_validator_1.IsNotEmpty)()];
            _title_decorators = [(0, class_validator_1.IsString)()];
            _artist_decorators = [(0, class_validator_1.IsString)()];
            _description_decorators = [(0, class_validator_1.IsString)()];
            _spotifyURL_decorators = [(0, class_validator_1.IsString)()];
            _date_decorators = [(0, class_validator_1.IsDateString)()];
            _albumCover_decorators = [(0, class_validator_1.IsString)()];
            _nickname_decorators = [(0, class_validator_1.IsString)()];
            __esDecorate(null, null, _latitude_decorators, { kind: "field", name: "latitude", static: false, private: false, access: { has: function (obj) { return "latitude" in obj; }, get: function (obj) { return obj.latitude; }, set: function (obj, value) { obj.latitude = value; } }, metadata: _metadata }, _latitude_initializers, _latitude_extraInitializers);
            __esDecorate(null, null, _longitude_decorators, { kind: "field", name: "longitude", static: false, private: false, access: { has: function (obj) { return "longitude" in obj; }, get: function (obj) { return obj.longitude; }, set: function (obj, value) { obj.longitude = value; } }, metadata: _metadata }, _longitude_initializers, _longitude_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _artist_decorators, { kind: "field", name: "artist", static: false, private: false, access: { has: function (obj) { return "artist" in obj; }, get: function (obj) { return obj.artist; }, set: function (obj, value) { obj.artist = value; } }, metadata: _metadata }, _artist_initializers, _artist_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _spotifyURL_decorators, { kind: "field", name: "spotifyURL", static: false, private: false, access: { has: function (obj) { return "spotifyURL" in obj; }, get: function (obj) { return obj.spotifyURL; }, set: function (obj, value) { obj.spotifyURL = value; } }, metadata: _metadata }, _spotifyURL_initializers, _spotifyURL_extraInitializers);
            __esDecorate(null, null, _date_decorators, { kind: "field", name: "date", static: false, private: false, access: { has: function (obj) { return "date" in obj; }, get: function (obj) { return obj.date; }, set: function (obj, value) { obj.date = value; } }, metadata: _metadata }, _date_initializers, _date_extraInitializers);
            __esDecorate(null, null, _albumCover_decorators, { kind: "field", name: "albumCover", static: false, private: false, access: { has: function (obj) { return "albumCover" in obj; }, get: function (obj) { return obj.albumCover; }, set: function (obj, value) { obj.albumCover = value; } }, metadata: _metadata }, _albumCover_initializers, _albumCover_extraInitializers);
            __esDecorate(null, null, _nickname_decorators, { kind: "field", name: "nickname", static: false, private: false, access: { has: function (obj) { return "nickname" in obj; }, get: function (obj) { return obj.nickname; }, set: function (obj, value) { obj.nickname = value; } }, metadata: _metadata }, _nickname_initializers, _nickname_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreatePostDto = CreatePostDto;
