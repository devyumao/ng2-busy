/**
 * @file Component: Busy
 * @author yumao<yuzhang.lille@gmail.com>
 */

import {
    Component,
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/core';

import {PromiseTrackerService} from './promise-tracker.service';


const inactiveStyle = style({
    opacity: 0,
    transform: 'translateY(-40px)'
});
const timing = '.3s ease';

export interface IBusyContext {
    message: string;
};

@Component({
    selector: 'ng-busy',
    template: `
        <div [class]="wrapperClass" *ngIf="isActive()" @flyInOut>
            <DynamicComponent [componentTemplate]="template" [componentContext]="context" [componentModules]="modules">
            </DynamicComponent>
        </div>
    `,
    animations: [
        trigger('flyInOut', [
            transition('void => *', [
                inactiveStyle,
                animate(timing)
            ]),
            transition('* => void', [
                animate(timing, inactiveStyle)
            ])
        ])
    ]
})
export class BusyComponent {
    message: string;
    wrapperClass: string;
    template: string;
    context: IBusyContext = {
        message: null
    };
    modules: any[];

    constructor(private tracker: PromiseTrackerService) {
    }

    isActive() {
        return this.tracker.isActive();
    }
}
