"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var url_config_1 = require("./url.config");
var header_config_1 = require("./header.config");
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.validateCredention = function (data) {
        var url = url_config_1.baseUrl + "Auth/Login";
        return axios_1.default.post(url, data, __assign({}, header_config_1.default));
    };
    AuthService.prototype.checkSessionValidity = function () {
        var url = url_config_1.baseUrl + "Auth/CheckSession";
        return axios_1.default.get(url, __assign({}, header_config_1.default));
    };
    AuthService.prototype.logoutUser = function () {
        var url = url_config_1.baseUrl + "Auth/Logout";
        return axios_1.default.get(url, __assign({}, header_config_1.default));
    };
    return AuthService;
}());
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map