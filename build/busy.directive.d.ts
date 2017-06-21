import { DoCheck, ViewContainerRef, ComponentFactoryResolver, OnDestroy, Injector } from '@angular/core';
import { PromiseTrackerService } from './promise-tracker.service';
import { BusyService } from './busy.service';
/**
 * ### Syntax
 *
 * - `<div [ngBusy]="busy">...</div>`
 * - `<div [ngBusy]="[busyA, busyB, busyC]">...</div>`
 * - `<div [ngBusy]="{busy: busy, message: 'Loading...',
 *                    backdrop: false, delay: 200, minDuration: 600}">...</div>`
 */
export declare class BusyDirective implements DoCheck, OnDestroy {
    private service;
    private tracker;
    private cfResolver;
    private vcRef;
    private injector;
    options: any;
    template: string;
    backdrop: boolean;
    private optionsRecord;
    private optionsNorm;
    private busyRef;
    private backdropRef;
    constructor(service: BusyService, tracker: PromiseTrackerService, cfResolver: ComponentFactoryResolver, vcRef: ViewContainerRef, injector: Injector);
    ngDoCheck(): void;
    ngOnDestroy(): void;
    private normalizeoptions(options);
    private dectectoptionsChange();
    private destroyComponents();
    private createBackdrop();
    private createBusy();
}
