import { Subscription } from 'rxjs/Subscription';
export declare class PromiseTrackerService {
    promiseList: Array<Promise<any> | Subscription>;
    delayPromise: number | any;
    durationPromise: number | any;
    delayJustFinished: boolean;
    minDuration: number;
    reset(options: IPromiseTrackerOptions): void;
    isActive(): boolean;
    private addPromise(promise);
    private finishPromise(promise);
}
export interface IPromiseTrackerOptions {
    minDuration: number;
    delay: number;
    promiseList: Promise<any>[];
}
