/**
 * @file Component: Options
 * @author yumao<yuzhang.lille@gmail.com>
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var __1 = require("../../..");
// import {BUSY_CONFIG_DEFAULTS, IBusyConfig} from 'angular2-busy';
var options_template_1 = require("./options-template");
var OptionsComponent = (function () {
    function OptionsComponent(http) {
        this.http = http;
        this.templateType = 'default';
        this.data = Object.assign({}, __1.BUSY_CONFIG_DEFAULTS);
    }
    OptionsComponent.prototype.changeTemplate = function (type) {
        this.data.template = options_template_1.OPTIONS_TEMPLATE[type];
    };
    OptionsComponent.prototype.playDemo = function () {
        // this.data.busy = this.http.get('https://httpbin.org/delay/3')
        //     .subscribe();
        this.data.busy = this.http.get('https://httpbin.org/delay/1')
            .toPromise();
    };
    return OptionsComponent;
}());
OptionsComponent = __decorate([
    core_1.Component({
        selector: 'demo-options',
        template: require('./options.component.html'),
        styles: [require('./options.component.less')]
    }),
    __metadata("design:paramtypes", [http_1.Http])
], OptionsComponent);
exports.OptionsComponent = OptionsComponent;
//# sourceMappingURL=options.component.js.map