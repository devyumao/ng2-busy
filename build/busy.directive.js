"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subscription_1 = require("rxjs/Subscription");
var busy_helper_1 = require("./busy-helper");
var promise_tracker_service_1 = require("./promise-tracker.service");
var busy_service_1 = require("./busy.service");
var busy_component_1 = require("./busy.component");
var busy_backdrop_component_1 = require("./busy-backdrop.component");
/**
 * ### Syntax
 *
 * - `<div [ngBusy]="busy">...</div>`
 * - `<div [ngBusy]="[busyA, busyB, busyC]">...</div>`
 * - `<div [ngBusy]="{busy: busy, message: 'Loading...',
 *                    backdrop: false, delay: 200, minDuration: 600}">...</div>`
 */
var BusyDirective = (function () {
    function BusyDirective(service, tracker, cfResolver, vcRef, injector) {
        this.service = service;
        this.tracker = tracker;
        this.cfResolver = cfResolver;
        this.vcRef = vcRef;
        this.injector = injector;
    }
    BusyDirective.prototype.ngDoCheck = function () {
        var options = this.optionsNorm = this.normalizeoptions(this.options);
        if (!this.dectectoptionsChange()) {
            return;
        }
        if (this.busyRef) {
            this.busyRef.instance.message = options.message;
        }
        if (!busy_helper_1.objectEquals(options.busy, this.tracker.promiseList)) {
            this.tracker.reset({
                promiseList: options.busy,
                delay: options.delay,
                minDuration: options.minDuration
            });
        }
        if (!this.busyRef
            || this.template !== options.template
            || this.backdrop !== options.backdrop) {
            this.destroyComponents();
            this.template = options.template;
            this.backdrop = options.backdrop;
            if (options.backdrop) {
                this.createBackdrop();
            }
            this.createBusy();
        }
    };
    BusyDirective.prototype.ngOnDestroy = function () {
        this.destroyComponents();
    };
    BusyDirective.prototype.normalizeoptions = function (options) {
        if (!options) {
            options = { busy: undefined };
        }
        else if (Array.isArray(options)
            || options instanceof Promise
            || options instanceof Subscription_1.Subscription) {
            options = { busy: options };
        }
        options = Object.assign({}, this.service.config, options);
        if (!Array.isArray(options.busy)) {
            options.busy = [options.busy];
        }
        return options;
    };
    BusyDirective.prototype.dectectoptionsChange = function () {
        if (busy_helper_1.objectEquals(this.optionsNorm, this.optionsRecord)) {
            return false;
        }
        this.optionsRecord = this.optionsNorm;
        return true;
    };
    BusyDirective.prototype.destroyComponents = function () {
        if (this.busyRef) {
            this.busyRef.destroy();
        }
        if (this.backdropRef) {
            this.backdropRef.destroy();
        }
    };
    BusyDirective.prototype.createBackdrop = function () {
        var backdropFactory = this.cfResolver.resolveComponentFactory(busy_backdrop_component_1.BusyBackdropComponent);
        this.backdropRef = this.vcRef.createComponent(backdropFactory, undefined, this.injector);
    };
    BusyDirective.prototype.createBusy = function () {
        var busyFactory = this.cfResolver.resolveComponentFactory(busy_component_1.BusyComponent);
        this.busyRef = this.vcRef.createComponent(busyFactory, undefined, this.injector);
        var _a = this.optionsNorm, message = _a.message, wrapperClass = _a.wrapperClass, template = _a.template;
        var instance = this.busyRef.instance;
        instance.message = message;
        instance.wrapperClass = wrapperClass;
        instance.template = template;
    };
    return BusyDirective;
}());
BusyDirective.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[ngBusy]',
                providers: [promise_tracker_service_1.PromiseTrackerService]
            },] },
];
/** @nocollapse */
BusyDirective.ctorParameters = function () { return [
    { type: busy_service_1.BusyService, },
    { type: promise_tracker_service_1.PromiseTrackerService, },
    { type: core_1.ComponentFactoryResolver, },
    { type: core_1.ViewContainerRef, },
    { type: core_1.Injector, },
]; };
BusyDirective.propDecorators = {
    'options': [{ type: core_1.Input, args: ['ngBusy',] },],
};
exports.BusyDirective = BusyDirective;
//# sourceMappingURL=busy.directive.js.map