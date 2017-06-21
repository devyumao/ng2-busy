/**
 * @file Component: Busy
 * @author yumao<yuzhang.lille@gmail.com>
 */

import {
    Component,
    NgModule,
    NgModuleFactory,
    Injectable,
    DoCheck,
    OnDestroy
} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';

import {PromiseTrackerService} from './promise-tracker.service';
import { JitCompiler } from './busy.module';


const inactiveStyle = style({
  opacity: 0
});
const timing = '.3s ease';

export interface IBusyContext {
  message: string;
};

@Component({
  selector: 'ng-busy',
  template: `
      <div [class]="wrapperClass" *ngIf="isActive()" @flyInOut>
          <ng-container *ngComponentOutlet="TemplateComponent; ngModuleFactory: factory;"></ng-container>
      </div>
  `,
  animations: [
      trigger('flyInOut', [
          // Enter
          transition('void => *', [
              inactiveStyle,
              animate(timing)
          ]),
          // Leave
          transition('* => void', [
              animate(timing, inactiveStyle)
          ])
      ])
  ]
})
export class BusyComponent implements DoCheck, OnDestroy {
  TemplateComponent;
  wrapperClass: string;
  template: string;
  message: string;
  private factory: NgModuleFactory<any>;
  private lastMessage: string;

  constructor(
      private tracker: PromiseTrackerService,
      private compiler: JitCompiler
  ) {}

  ngDoCheck() {
    if (this.message === this.lastMessage) {
        return;
    }
    this.lastMessage = this.message;
    this.clearDynamicTemplateCache();
    this.createDynamicTemplate();
  }

  ngOnDestroy(): void {
    this.clearDynamicTemplateCache();
  }

  createDynamicTemplate() {
    const {template, message} = this;

    @Component({template})
    class TemplateComponent {
        message: string = message;
    }

    @NgModule({
        declarations: [TemplateComponent],
        entryComponents: [TemplateComponent]
    })
    class TemplateModule {}

    this.TemplateComponent = TemplateComponent;
    this.factory = this.compiler.compileModuleSync(TemplateModule);
  }

  clearDynamicTemplateCache() {
    if (!this.factory) {
        return;
    }

    this.compiler.clearCacheFor(this.factory.moduleType);
    this.factory = null;
  }

  isActive() {
    return this.tracker.isActive();
  }
}
