/// <reference types="core-js" />
import { Subscription } from 'rxjs/Subscription';
export declare class BusyConfig implements IBusyConfig {
    template: string;
    modules: any[];
    delay: number;
    minDuration: number;
    backdrop: boolean;
    message: string;
    wrapperClass: string;
    constructor(config?: IBusyConfig);
}
export interface IBusyConfig {
    template?: string;
    modules?: any[];
    delay?: number;
    minDuration?: number;
    backdrop?: boolean;
    message?: string;
    wrapperClass?: string;
    busy?: Promise<any> | Subscription | Array<Promise<any> | Subscription>;
}
export declare const BUSY_CONFIG_DEFAULTS: {
    template: string;
    modules: any[];
    delay: number;
    minDuration: number;
    backdrop: boolean;
    message: string;
    wrapperClass: string;
};
