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
var TalentService = /** @class */ (function () {
    function TalentService() {
    }
    TalentService.prototype.fetchTalentList = function (searchPrms) {
        var url = url_config_1.baseUrl + "Account/GetEmployeeList";
        return axios_1.default.post(url, searchPrms, __assign({}, header_config_1.default));
    };
    return TalentService;
}());
exports.default = TalentService;
//# sourceMappingURL=talent.servicee.js.map