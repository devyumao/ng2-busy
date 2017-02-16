/// <reference types="core-js" />
import { Subscription } from 'rxjs/Subscription';
export declare class PromiseTrackerService {
    promiseList: Array<Promise<any> | Subscription>;
    delayPromise: number | any;
    durationPromise: number | any;
    delayJustFinished: boolean;
    minDuration: number;
    reset(options: IPromiseTrackerOptions): void;
    private addPromise(promise);
    private finishPromise(promise);
    isActive(): boolean;
}
export interface IPromiseTrackerOptions {
    minDuration: number;
    delay: number;
    promiseList: Promise<any>[];
}
