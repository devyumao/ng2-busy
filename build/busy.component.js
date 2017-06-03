/**
 * @file Component: Busy
 * @author yumao<yuzhang.lille@gmail.com>
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var promise_tracker_service_1 = require("./promise-tracker.service");
var busy_module_1 = require("./busy.module");
var inactiveStyle = animations_1.style({
    opacity: 0,
    transform: 'translateY(-40px)'
});
var timing = '.3s ease';
;
var BusyComponent = (function () {
    function BusyComponent(tracker, compiler) {
        this.tracker = tracker;
        this.compiler = compiler;
    }
    BusyComponent.prototype.ngDoCheck = function () {
        if (this.message === this.lastMessage) {
            return;
        }
        this.lastMessage = this.message;
        this.clearDynamicTemplateCache();
        this.createDynamicTemplate();
    };
    BusyComponent.prototype.ngOnDestroy = function () {
        this.clearDynamicTemplateCache();
    };
    BusyComponent.prototype.createDynamicTemplate = function () {
        var _a = this, template = _a.template, message = _a.message;
        var TemplateComponent = (function () {
            function TemplateComponent() {
                this.message = message;
            }
            return TemplateComponent;
        }());
        TemplateComponent.decorators = [
            { type: core_1.Component, args: [{ template: template },] },
        ];
        /** @nocollapse */
        TemplateComponent.ctorParameters = function () { return []; };
        var TemplateModule = (function () {
            function TemplateModule() {
            }
            return TemplateModule;
        }());
        TemplateModule.decorators = [
            { type: core_1.NgModule, args: [{
                        declarations: [TemplateComponent],
                        entryComponents: [TemplateComponent]
                    },] },
        ];
        /** @nocollapse */
        TemplateModule.ctorParameters = function () { return []; };
        this.TemplateComponent = TemplateComponent;
        this.nmf = this.compiler.compileModuleSync(TemplateModule);
    };
    BusyComponent.prototype.clearDynamicTemplateCache = function () {
        if (!this.nmf) {
            return;
        }
        this.compiler.clearCacheFor(this.nmf.moduleType);
        this.nmf = null;
    };
    BusyComponent.prototype.isActive = function () {
        return this.tracker.isActive();
    };
    return BusyComponent;
}());
BusyComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ng-busy',
                template: "\n        <div [class]=\"wrapperClass\" *ngIf=\"isActive()\" @flyInOut>\n            <ng-container *ngComponentOutlet=\"TemplateComponent; ngModuleFactory: nmf;\"></ng-container>\n        </div>\n    ",
                animations: [
                    animations_1.trigger('flyInOut', [
                        animations_1.transition('void => *', [
                            inactiveStyle,
                            animations_1.animate(timing)
                        ]),
                        animations_1.transition('* => void', [
                            animations_1.animate(timing, inactiveStyle)
                        ])
                    ])
                ]
            },] },
];
/** @nocollapse */
BusyComponent.ctorParameters = function () { return [
    { type: promise_tracker_service_1.PromiseTrackerService, },
    { type: busy_module_1.CustomCompiler, },
]; };
exports.BusyComponent = BusyComponent;
//# sourceMappingURL=busy.component.js.map