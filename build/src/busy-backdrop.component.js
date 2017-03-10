/**
 * @file Component: BusyBackdrop
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
var promise_tracker_service_1 = require("./promise-tracker.service");
var inactiveStyle = core_1.style({
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
BusyBackdropComponent = __decorate([
    core_1.Component({
        selector: 'ng-busy-backdrop',
        template: "\n        <div class=\"ng-busy-backdrop\"\n             @fadeInOut\n             *ngIf=\"isActive()\">\n        </div>\n    ",
        animations: [
            core_1.trigger('fadeInOut', [
                core_1.transition('void => *', [
                    inactiveStyle,
                    core_1.animate(timing)
                ]),
                core_1.transition('* => void', [
                    core_1.animate(timing, inactiveStyle)
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [promise_tracker_service_1.PromiseTrackerService])
], BusyBackdropComponent);
exports.BusyBackdropComponent = BusyBackdropComponent;
//# sourceMappingURL=busy-backdrop.component.js.map