/**
 * @file Component: Busy
 * @author yumao<yuzhang.lille@gmail.com>
 */
import { DoCheck, OnDestroy } from '@angular/core';
import { PromiseTrackerService } from './promise-tracker.service';
import { JitCompiler } from './busy.module';
export interface IBusyContext {
    message: string;
}
export declare class BusyComponent implements DoCheck, OnDestroy {
    private tracker;
    private compiler;
    TemplateComponent: any;
    wrapperClass: string;
    template: string;
    message: string;
    private factory;
    private lastMessage;
    constructor(tracker: PromiseTrackerService, compiler: JitCompiler);
    ngDoCheck(): void;
    ngOnDestroy(): void;
    createDynamicTemplate(): void;
    clearDynamicTemplateCache(): void;
    isActive(): boolean;
}
