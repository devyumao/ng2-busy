"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Component: BusyBackdrop
 * @author yumao<yuzhang.lille@gmail.com>
 */
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var promise_tracker_service_1 = require("./promise-tracker.service");
var inactiveStyle = animations_1.style({
    opacity: 0,
});
var timing = '.3s ease';
var BusyBackdropComponent = (function () {
    function BusyBackdropComponent(tracker) {
        this.tracker = tracker;
    }
    BusyBackdropComponent.prototype.isActive = function () {
        return this.tracker.isActive();
    };
    return BusyBackdropComponent;
}());
BusyBackdropComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ng-busy-backdrop',
                template: "\n      <div class=\"ng-busy-backdrop\"\n          @fadeInOut\n          *ngIf=\"isActive()\">\n      </div>\n  ",
                animations: [
                    animations_1.trigger('fadeInOut', [
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
BusyBackdropComponent.ctorParameters = function () { return [
    { type: promise_tracker_service_1.PromiseTrackerService, },
]; };
exports.BusyBackdropComponent = BusyBackdropComponent;
//# sourceMappingURL=busy-backdrop.component.js.map