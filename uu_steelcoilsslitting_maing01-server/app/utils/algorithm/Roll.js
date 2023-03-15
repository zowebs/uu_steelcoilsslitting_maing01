"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roll = void 0;
var Roll = /** @class */ (function () {
    function Roll(weight, serie, thickness, width) {
        this._strips = null;
        this._weight = weight;
        this._serie = serie;
        this._thickness = thickness;
        this._width = width;
    }
    Object.defineProperty(Roll.prototype, "weight", {
        get: function () {
            return this._weight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Roll.prototype, "serie", {
        get: function () {
            return this._serie;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Roll.prototype, "thickness", {
        get: function () {
            return this._thickness;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Roll.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Roll.prototype, "strips", {
        get: function () {
            return this._strips;
        },
        set: function (value) {
            this._strips = value;
        },
        enumerable: false,
        configurable: true
    });
    return Roll;
}());
exports.Roll = Roll;
