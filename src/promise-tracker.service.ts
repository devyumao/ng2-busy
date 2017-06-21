/**
 * @file Service: PromiseTracker
 * @author yumao<yuzhang.lille@gmail.com>
 */

// Inspired by angular-promise-tracker
// Add Observable Subscription

// The basic idea: each time we add one or more promises to an instance of a promiseTracker,
// that instance's active() method will return true until all added promises are resolved.
// A common use case is showing some sort of loading spinner while some http requests are loading.

import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class PromiseTrackerService {
  promiseList: Array<Promise<any> | Subscription> = [];
  delayPromise: number | any;
  durationPromise: number | any;
  delayJustFinished = false;
  minDuration: number;

  reset(options: IPromiseTrackerOptions) {
    this.minDuration = options.minDuration;

    this.promiseList = [];
    options.promiseList.forEach(promise => {
      if (!promise || promise['busyFulfilled']) {
          return;
      }
      this.addPromise(promise);
    });

    if (this.promiseList.length === 0) {
      return;
    }

    this.delayJustFinished = false;
    if (options.delay) {
      this.delayPromise = setTimeout(
        () => {
            this.delayPromise = null;
            this.delayJustFinished = true;
        },
        options.delay
      );
    }
    if (options.minDuration) {
        this.durationPromise = setTimeout(
          () => {
              this.durationPromise = null;
          },
          options.minDuration + (options.delay || 0)
        );
    }
  }

  isActive() {
      if (this.delayPromise) {
        return false;
      }

      if (!this.delayJustFinished) {
        if (this.durationPromise) {
            return true;
        }
        return this.promiseList.length > 0;
      }

      this.delayJustFinished = false;
      if (this.promiseList.length === 0) {
        this.durationPromise = null;
      }
      return this.promiseList.length > 0;
  }
  private addPromise(promise: Promise<any> | Subscription) {
      if (this.promiseList.indexOf(promise) !== -1) {
        return;
      }

      this.promiseList.push(promise);

      if (promise instanceof Promise) {
        promise.then.call(
          promise,
          () => this.finishPromise(promise),
          () => this.finishPromise(promise)
        );
      } else if (promise instanceof Subscription) {
          promise.add(() => this.finishPromise(promise));
      }
  }

  private finishPromise(promise: Promise<any> | Subscription) {
      promise['busyFulfilled'] = true;
      const index = this.promiseList.indexOf(promise);
      if (index === -1) {
        return;
      }
      this.promiseList.splice(index, 1);
  }
}

export interface IPromiseTrackerOptions {
  minDuration: number;
  delay: number;
  promiseList: Promise<any>[];
}
