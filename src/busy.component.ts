/**
 * @file Component: Busy
 * @author yumao<yuzhang.lille@gmail.com>
 */

import {
    Component,
    NgModule,
    NgModuleFactory,
    Injectable,
    DoCheck,
    OnDestroy
} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';

import {PromiseTrackerService} from './promise-tracker.service';
import { InjectionCompiler } from './busy.module';


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
            <ng-container *ngComponentOutlet="TemplateComponent; ngModuleFactory: nmf;"></ng-container>
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
export class BusyComponent implements DoCheck, OnDestroy {
    TemplateComponent;
    private nmf: NgModuleFactory<any>;
    wrapperClass: string;
    template: string;
    message: string;
    private lastMessage: string;

    constructor(
        private tracker: PromiseTrackerService,
        private compiler: InjectionCompiler
    ) {}

    ngDoCheck() {
        if (this.message === this.lastMessage) {
            return;
        }
        this.lastMessage = this.message;
        this.clearDynamicTemplateCache();
        this.createDynamicTemplate();
    }

    ngOnDestroy(): void {
        this.clearDynamicTemplateCache();
    }

    createDynamicTemplate() {
        const {template, message} = this;

        @Component({template})
        class TemplateComponent {
            message: string = message;
        }

        @NgModule({
            declarations: [TemplateComponent],
            entryComponents: [TemplateComponent]
        })
        class TemplateModule {}

        this.TemplateComponent = TemplateComponent;
        this.nmf = this.compiler.compileModuleSync(TemplateModule);
    }

    clearDynamicTemplateCache() {
        if (!this.nmf) {
            return;
        }

        this.compiler.clearCacheFor(this.nmf.moduleType);
        this.nmf = null;
    }

    isActive() {
        return this.tracker.isActive();
    }
}
