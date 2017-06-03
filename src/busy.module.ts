/**
 * @file Module: Busy
 * @author yumao<yuzhang.lille@gmail.com>
 */

import {NgModule, Compiler} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModuleWithProviders} from '@angular/core';
import {JitCompilerFactory} from '@angular/compiler';

import {BusyDirective} from './busy.directive';
import {BusyService} from './busy.service';
import {BusyBackdropComponent} from './busy-backdrop.component';
import {BusyComponent} from './busy.component';
import {BusyConfig} from './busy-config';

// Workaround for Compiler in AOT
// https://github.com/angular/angular/issues/15510#issuecomment-294301758
//
export class CustomCompiler extends Compiler {
    constructor() {
        super();
    }
}

export function createJitCompiler() {
    return new JitCompilerFactory([{useDebug: false, useJit: true}]).createCompiler();
}

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BusyDirective,
        BusyComponent,
        BusyBackdropComponent,
    ],
    providers: [
        BusyService,
        {
            provide: CustomCompiler, 
            useFactory: createJitCompiler
        },
    ],
    exports: [BusyDirective],
    entryComponents: [
        BusyComponent,
        BusyBackdropComponent
    ]
})
export class BusyModule {
    static forRoot(config: BusyConfig): ModuleWithProviders {
        return {
            ngModule: BusyModule,
            providers: [
                {provide: BusyConfig, useValue: config}
            ]
        };
    }
}
