import { PromiseTrackerService } from './promise-tracker.service';
export interface IBusyContext {
    message: string;
}
export declare class BusyComponent {
    private tracker;
    message: string;
    wrapperClass: string;
    template: string;
    context: IBusyContext;
    modules: any[];
    constructor(tracker: PromiseTrackerService);
    isActive(): boolean;
}
