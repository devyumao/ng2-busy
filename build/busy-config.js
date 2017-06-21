"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUSY_CONFIG_DEFAULTS = {
    template: "\n        <div class=\"ng-busy-default-wrapper\">\n            <div class=\"ng-busy-default-sign\">\n                <div class=\"ng-busy-default-spinner\">\n                    <div class=\"bar1\"></div>\n                    <div class=\"bar2\"></div>\n                    <div class=\"bar3\"></div>\n                    <div class=\"bar4\"></div>\n                    <div class=\"bar5\"></div>\n                    <div class=\"bar6\"></div>\n                    <div class=\"bar7\"></div>\n                    <div class=\"bar8\"></div>\n                    <div class=\"bar9\"></div>\n                    <div class=\"bar10\"></div>\n                    <div class=\"bar11\"></div>\n                    <div class=\"bar12\"></div>\n                </div>\n                <div class=\"ng-busy-default-text\">{{message}}</div>\n            </div>\n        </div>  \n  ",
    delay: 0,
    minDuration: 0,
    backdrop: true,
    message: 'Please wait...',
    wrapperClass: 'ng-busy'
};
var BusyConfig = (function () {
    function BusyConfig(config) {
        if (config === void 0) { config = {}; }
        for (var option in exports.BUSY_CONFIG_DEFAULTS) {
            if (config[option] !== undefined) {
                this[option] = config[option];
            }
            else {
                this[option] = exports.BUSY_CONFIG_DEFAULTS[option];
            }
        }
    }
    return BusyConfig;
}());
exports.BusyConfig = BusyConfig;
//# sourceMappingURL=busy-config.js.map