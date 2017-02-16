import { DoCheck, ViewContainerRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { PromiseTrackerService } from './promise-tracker.service';
import { BusyService } from './busy.service';
export declare class BusyDirective implements DoCheck {
    private service;
    private tracker;
    private cfResolver;
    private vcRef;
    private injector;
    options: any;
    private optionsRecord;
    private optionsNorm;
    template: string;
    backdrop: boolean;
    private busyRef;
    private backdropRef;
    constructor(service: BusyService, tracker: PromiseTrackerService, cfResolver: ComponentFactoryResolver, vcRef: ViewContainerRef, injector: Injector);
    private normalizeOptions(options);
    private dectectOptionsChange();
    ngDoCheck(): void;
    ngOnDestroy(): void;
    private destroyComponents();
    private createBackdrop();
    private createBusy();
}
