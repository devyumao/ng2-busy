/**
 * @file Component: Busy
 * @author yumao<yuzhang.lille@gmail.com>
 */
import { DoCheck, OnDestroy } from '@angular/core';
import { PromiseTrackerService } from './promise-tracker.service';
import { CustomCompiler } from './busy.module';
export interface IBusyContext {
    message: string;
}
export declare class BusyComponent implements DoCheck, OnDestroy {
    private tracker;
    private compiler;
    TemplateComponent: any;
    private nmf;
    wrapperClass: string;
    template: string;
    message: string;
    private lastMessage;
    constructor(tracker: PromiseTrackerService, compiler: CustomCompiler);
    ngDoCheck(): void;
    ngOnDestroy(): void;
    createDynamicTemplate(): void;
    clearDynamicTemplateCache(): void;
    isActive(): boolean;
}
