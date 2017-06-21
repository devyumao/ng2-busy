/**
 * @file Service: Busy
 * @author yumao<yuzhang.lille@gmail.com>
 */

import {Injectable, Optional} from '@angular/core';

import {BusyConfig} from './busy-config';

@Injectable()
export class BusyService {
    config: BusyConfig;

    constructor(@Optional() config: BusyConfig) {
        this.config = config || new BusyConfig();
    }
}
