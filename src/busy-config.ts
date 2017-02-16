/**
 * @file Busy Config
 * @author yumao<yuzhang.lille@gmail.com>
 */

import {Subscription} from 'rxjs/Subscription';

export class BusyConfig implements IBusyConfig {
    template: string;
    modules: any[];
    delay: number;
    minDuration: number;
    backdrop: boolean;
    message: string;
    wrapperClass: string;

    constructor(config: IBusyConfig = {}) {
        for (let option in BUSY_CONFIG_DEFAULTS) {
            this[option] = config[option] != null ? config[option] : BUSY_CONFIG_DEFAULTS[option];
        }
    }
}

export interface IBusyConfig {
    template?: string;
    modules?: any[];
    delay?: number;
    minDuration?: number;
    backdrop?: boolean;
    message?: string;
    wrapperClass?: string;
    busy?: Promise<any> | Subscription | Array<Promise<any> | Subscription>
}

export const BUSY_CONFIG_DEFAULTS = {
    template: `
        <div class="ng-busy-default-wrapper">
            <div class="ng-busy-default-sign">
                <div class="ng-busy-default-spinner">
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                    <div class="bar4"></div>
                    <div class="bar5"></div>
                    <div class="bar6"></div>
                    <div class="bar7"></div>
                    <div class="bar8"></div>
                    <div class="bar9"></div>
                    <div class="bar10"></div>
                    <div class="bar11"></div>
                    <div class="bar12"></div>
                </div>
                <div class="ng-busy-default-text">{{message}}</div>
            </div>
        </div>
    `,
    modules: [],
    delay: 0,
    minDuration: 0,
    backdrop: true,
    message: 'Please wait...',
    wrapperClass: 'ng-busy'
};
