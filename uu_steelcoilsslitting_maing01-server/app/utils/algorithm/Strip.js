"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Strip = void 0;
var Strip = /** @class */ (function () {
    function Strip(width, neededWeight) {
        this._currentWeight = 0;
        this._width = width;
        this._neededWeight = neededWeight;
    }
    Object.defineProperty(Strip.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Strip.prototype, "neededWeight", {
        get: function () {
            return this._neededWeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Strip.prototype, "currentWeight", {
        get: function () {
            return this._currentWeight;
        },
        enumerable: false,
        configurable: true
    });
    Strip.prototype.addWeight = function (value) {
        this._currentWeight += value;
    };
    return Strip;
}());
exports.Strip = Strip;
