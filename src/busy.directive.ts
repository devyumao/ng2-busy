import {
    Directive,
    Component,
    Input,
    DoCheck,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    OnDestroy,
    Injector
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import { objectEquals } from './busy-helper';
import { PromiseTrackerService } from './promise-tracker.service';
import { BusyService } from './busy.service';
import { IBusyConfig } from './busy-config';
import { BusyComponent } from './busy.component';
import { BusyBackdropComponent } from './busy-backdrop.component';

/**
 * ### Syntax
 *
 * - `<div [ngBusy]="busy">...</div>`
 * - `<div [ngBusy]="[busyA, busyB, busyC]">...</div>`
 * - `<div [ngBusy]="{busy: busy, message: 'Loading...',
 *                    backdrop: false, delay: 200, minDuration: 600}">...</div>`
 */
@Directive({
    selector: '[ngBusy]',
    providers: [PromiseTrackerService]
})
export class BusyDirective implements DoCheck, OnDestroy {

    @Input('ngBusy') options: any;

    template: string;
    backdrop: boolean;
    private optionsRecord: any;
    private optionsNorm: IBusyConfig;
    private busyRef: ComponentRef<BusyComponent>;
    private backdropRef: ComponentRef<BusyBackdropComponent>;

    constructor(
        private service: BusyService,
        private tracker: PromiseTrackerService,
        private cfResolver: ComponentFactoryResolver,
        private vcRef: ViewContainerRef,
        private injector: Injector
    ) {
    }

    ngDoCheck() {
        const options = this.optionsNorm = this.normalizeoptions(this.options);

        if (!this.dectectoptionsChange()) {
            return;
        }

        if (this.busyRef) {
            this.busyRef.instance.message = options.message;
        }

        if (!objectEquals(options.busy, this.tracker.promiseList)) {
            this.tracker.reset({
                promiseList: options.busy,
                delay: options.delay,
                minDuration: options.minDuration
            });
        }

        if (!this.busyRef
            || this.template !== options.template
            || this.backdrop !== options.backdrop
        ) {
            this.destroyComponents();

            this.template = options.template;
            this.backdrop = options.backdrop;

            if (options.backdrop) {
              this.createBackdrop();
            }

            this.createBusy();
        }
    }

    ngOnDestroy() {
        this.destroyComponents();
    }

    private normalizeoptions(options: any) {
        if (!options) {
            options = {busy: undefined};
        }else if (Array.isArray(options)
            || options instanceof Promise
            || options instanceof Subscription
        ) {
            options = {busy: options};
        }
        options = Object.assign({}, this.service.config, options);
        if (!Array.isArray(options.busy)) {
            options.busy = [options.busy];
        }

        return options;
    }

    private dectectoptionsChange() {
        if (objectEquals(this.optionsNorm, this.optionsRecord)) {
            return false;
        }
        this.optionsRecord = this.optionsNorm;
        return true;
    }

    private destroyComponents() {
        if (this.busyRef) {
          this.busyRef.destroy();
        }
        if (this.backdropRef) {
          this.backdropRef.destroy();
        }
    }

    private createBackdrop() {
        const backdropFactory = this.cfResolver.resolveComponentFactory(BusyBackdropComponent);
        this.backdropRef = this.vcRef.createComponent(backdropFactory, undefined, this.injector);
    }

    private createBusy() {
        const busyFactory = this.cfResolver.resolveComponentFactory(BusyComponent);
        this.busyRef = this.vcRef.createComponent(busyFactory, undefined, this.injector);

        const {message, wrapperClass, template} = this.optionsNorm;
        const instance = this.busyRef.instance;
        instance.message = message;
        instance.wrapperClass = wrapperClass;
        instance.template = template;
    }
}
