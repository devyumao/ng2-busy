/**
 * @file Service: PromiseTracker
 * @author yumao<yuzhang.lille@gmail.com>
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Inspired by angular-promise-tracker
// Add Observable Subscription
// The basic idea: each time we add one or more promises to an instance of a promiseTracker,
// that instance's active() method will return true until all added promises are resolved.
// A common use case is showing some sort of loading spinner while some http requests are loading.
var core_1 = require("@angular/core");
var Subscription_1 = require("rxjs/Subscription");
var PromiseTrackerService = (function () {
    function PromiseTrackerService() {
        this.promiseList = [];
        this.delayJustFinished = false;
    }
    PromiseTrackerService.prototype.reset = function (options) {
        var _this = this;
        this.minDuration = options.minDuration;
        this.promiseList = [];
        options.promiseList.forEach(function (promise) {
            if (!promise || promise['busyFulfilled']) {
                return;
            }
            _this.addPromise(promise);
        });
        if (this.promiseList.length === 0) {
            return;
        }
        this.delayJustFinished = false;
        if (options.delay) {
            this.delayPromise = setTimeout(function () {
                _this.delayPromise = null;
                _this.delayJustFinished = true;
            }, options.delay);
        }
        if (options.minDuration) {
            this.durationPromise = setTimeout(function () {
                _this.durationPromise = null;
            }, options.minDuration + (options.delay || 0));
        }
    };
    PromiseTrackerService.prototype.isActive = function () {
        if (this.delayPromise) {
            return false;
        }
        if (!this.delayJustFinished) {
            if (this.durationPromise) {
                return true;
            }
            return this.promiseList.length > 0;
        }
        this.delayJustFinished = false;
        if (this.promiseList.length === 0) {
            this.durationPromise = null;
        }
        return this.promiseList.length > 0;
    };
    PromiseTrackerService.prototype.addPromise = function (promise) {
        var _this = this;
        if (this.promiseList.indexOf(promise) !== -1) {
            return;
        }
        this.promiseList.push(promise);
        if (promise instanceof Promise) {
            promise.then.call(promise, function () { return _this.finishPromise(promise); }, function () { return _this.finishPromise(promise); });
        }
        else if (promise instanceof Subscription_1.Subscription) {
            promise.add(function () { return _this.finishPromise(promise); });
        }
    };
    PromiseTrackerService.prototype.finishPromise = function (promise) {
        promise['busyFulfilled'] = true;
        var index = this.promiseList.indexOf(promise);
        if (index === -1) {
            return;
        }
        this.promiseList.splice(index, 1);
    };
    return PromiseTrackerService;
}());
PromiseTrackerService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
PromiseTrackerService.ctorParameters = function () { return []; };
exports.PromiseTrackerService = PromiseTrackerService;
//# sourceMappingURL=promise-tracker.service.js.map