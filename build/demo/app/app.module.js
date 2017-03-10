"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var __1 = require("../..");
// import {BusyModule, BusyConfig} from 'angular2-busy';
var app_component_1 = require("./app.component");
var github_corner_1 = require("./github-corner");
var header_1 = require("./header");
var options_1 = require("./options");
var table_1 = require("./table");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            __1.BusyModule
            // BusyModule.forRoot(new BusyConfig({
            //     message: 'test',
            //     backdrop: false
            // }))
        ],
        declarations: [
            app_component_1.AppComponent,
            github_corner_1.GithubCornerComponent,
            header_1.HeaderComponent,
            options_1.OptionsComponent,
            table_1.TableComponent
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map