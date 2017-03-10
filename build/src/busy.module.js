/**
 * @file Module: Busy
 * @author yumao<yuzhang.lille@gmail.com>
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var index_1 = require("angular2-dynamic-component/index");
var busy_directive_1 = require("./busy.directive");
var busy_service_1 = require("./busy.service");
var busy_backdrop_component_1 = require("./busy-backdrop.component");
var busy_component_1 = require("./busy.component");
var busy_config_1 = require("./busy-config");
var BusyModule = BusyModule_1 = (function () {
    function BusyModule() {
    }
    BusyModule.forRoot = function (config) {
        return {
            ngModule: BusyModule_1,
            providers: [
                { provide: busy_config_1.BusyConfig, useValue: config }
            ]
        };
    };
    return BusyModule;
}());
BusyModule = BusyModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            index_1.DynamicComponentModule
        ],
        declarations: [
            busy_directive_1.BusyDirective,
            busy_component_1.BusyComponent,
            busy_backdrop_component_1.BusyBackdropComponent,
        ],
        providers: [busy_service_1.BusyService],
        exports: [busy_directive_1.BusyDirective],
        entryComponents: [
            busy_component_1.BusyComponent,
            busy_backdrop_component_1.BusyBackdropComponent
        ]
    })
], BusyModule);
exports.BusyModule = BusyModule;
var BusyModule_1;
//# sourceMappingURL=busy.module.js.map