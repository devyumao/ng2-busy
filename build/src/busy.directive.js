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
var core_1 = require('@angular/core');
var Subscription_1 = require('rxjs/Subscription');
var util_1 = require('./util');
var promise_tracker_service_1 = require('./promise-tracker.service');
var busy_service_1 = require('./busy.service');
var busy_component_1 = require('./busy.component');
var busy_backdrop_component_1 = require('./busy-backdrop.component');
var BusyDirective = (function () {
    function BusyDirective(service, tracker, cfResolver, vcRef, injector) {
        this.service = service;
        this.tracker = tracker;
        this.cfResolver = cfResolver;
        this.vcRef = vcRef;
        this.injector = injector;
    }
    BusyDirective.prototype.normalizeOptions = function (options) {
        if (!options) {
            options = { busy: null };
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
    BusyDirective.prototype.dectectOptionsChange = function () {
        if (util_1.equals(this.optionsNorm, this.optionsRecord)) {
            return false;
        }
        this.optionsRecord = this.optionsNorm;
        return true;
    };
    BusyDirective.prototype.ngDoCheck = function () {
        var options = this.optionsNorm = this.normalizeOptions(this.options);
        if (!this.dectectOptionsChange()) {
            return;
        }
        if (this.busyRef) {
            this.busyRef.instance.context.message = options.message;
        }
        !util_1.equals(options.busy, this.tracker.promiseList)
            && this.tracker.reset({
                promiseList: options.busy,
                delay: options.delay,
                minDuration: options.minDuration
            });
        if (!this.busyRef
            || this.template !== options.template
            || this.backdrop !== options.backdrop) {
            this.destroyComponents();
            this.template = options.template;
            this.backdrop = options.backdrop;
            options.backdrop && this.createBackdrop();
            this.createBusy();
        }
    };
    BusyDirective.prototype.ngOnDestroy = function () {
        this.destroyComponents();
    };
    BusyDirective.prototype.destroyComponents = function () {
        this.busyRef && this.busyRef.destroy();
        this.backdropRef && this.backdropRef.destroy();
    };
    BusyDirective.prototype.createBackdrop = function () {
        var backdropFactory = this.cfResolver.resolveComponentFactory(busy_backdrop_component_1.BusyBackdropComponent);
        this.backdropRef = this.vcRef.createComponent(backdropFactory, null, this.injector);
    };
    BusyDirective.prototype.createBusy = function () {
        var busyFactory = this.cfResolver.resolveComponentFactory(busy_component_1.BusyComponent);
        this.busyRef = this.vcRef.createComponent(busyFactory, null, this.injector);
        var _a = this.optionsNorm, message = _a.message, wrapperClass = _a.wrapperClass, template = _a.template;
        var instance = this.busyRef.instance;
        instance.context.message = message;
        instance.wrapperClass = wrapperClass;
        instance.template = template;
        instance.modules = this.optionsNorm.modules;
    };
    __decorate([
        core_1.Input('ngBusy'), 
        __metadata('design:type', Object)
    ], BusyDirective.prototype, "options", void 0);
    BusyDirective = __decorate([
        core_1.Directive({
            selector: '[ngBusy]',
            providers: [promise_tracker_service_1.PromiseTrackerService]
        }), 
        __metadata('design:paramtypes', [busy_service_1.BusyService, promise_tracker_service_1.PromiseTrackerService, core_1.ComponentFactoryResolver, core_1.ViewContainerRef, core_1.Injector])
    ], BusyDirective);
    return BusyDirective;
}());
exports.BusyDirective = BusyDirective;
//# sourceMappingURL=busy.directive.js.map