/**
 * @file Busy Config
 * @author yumao<yuzhang.lille@gmail.com>
 */
import { Subscription } from 'rxjs/Subscription';
export declare const BUSY_CONFIG_DEFAULTS: {
    template: string;
    delay: number;
    minDuration: number;
    backdrop: boolean;
    message: string;
    wrapperClass: string;
};
export declare class BusyConfig implements IBusyConfig {
    template: string;
    delay: number;
    minDuration: number;
    backdrop: boolean;
    message: string;
    wrapperClass: string;
    constructor(config?: IBusyConfig);
}
export interface IBusyConfig {
    template?: string;
    delay?: number;
    minDuration?: number;
    backdrop?: boolean;
    message?: string;
    wrapperClass?: string;
    busy?: Promise<any> | Subscription | Array<Promise<any> | Subscription>;
}
