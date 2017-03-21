import {ModuleWithProviders, NgModule} from '@angular/core';
import {BusyConfig} from './busy-config';
@NgModule()
export declare class BusyModule {
    static forRoot(config: BusyConfig): ModuleWithProviders;
}
