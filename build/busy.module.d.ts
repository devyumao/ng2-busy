/**
 * @file Module: Busy
 * @author yumao<yuzhang.lille@gmail.com>
 */
import { Compiler } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { BusyConfig } from './busy-config';
export declare class JitCompiler extends Compiler {
    constructor();
}
export declare function createJitCompiler(): Compiler;
export declare class BusyModule {
    static forRoot(config: BusyConfig): ModuleWithProviders;
}
