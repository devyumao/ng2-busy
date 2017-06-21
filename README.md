# Angular2-Busy

[![npm version](https://img.shields.io/npm/v/angular2-busy.svg?style=flat-square)](https://www.npmjs.com/package/angular2-busy) [![Build Status](https://img.shields.io/travis/devyumao/angular2-busy/master.svg?style=flat-square)](https://travis-ci.org/devyumao/angular2-busy)

**Angular 2 Busy** can show busy/loading indicators on any promise, or on any Observable's subscription.

![demo](https://raw.githubusercontent.com/devyumao/devyumao.github.io/master/angular2-busy/img/demo.gif)

Rewritten from [angular-busy](https://github.com/cgross/angular-busy), and add some new features in terms of Angular 2.

### Built with Angular 4.0.1

## Demo

[devyumao.github.io/angular2-busy/demo/asset/](http://devyumao.github.io/angular2-busy/demo/asset/)

## Installation

```shell
npm install --save angular2-busy
```

## Link CSS

```html
<link rel="stylesheet" href="/node_modules/angular2-busy/build/style/busy.css">
```

## Getting Started

Import the `BusyModule` in your root application module:

```typescript
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BusyModule} from 'angular2-busy';

@NgModule({
	imports: [
    	// ...
        BrowserAnimationsModule,
        BusyModule
    ],
	// ...
})
export class AppModule {}
```


Reference your promise in the `ngBusy` directive:

```typescript
import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

@Component({
    selector: 'some',
    template: `
        <div [ngBusy]="busy"></div>
    `
})
class SomeComponent implements OnInit {
    busy: Promise<any>;

    constructor(private http: Http) {}

    ngOnInit() {
        this.busy = this.http.get('...').toPromise();
    }
}
```

Moreover, the subscription of an Observable is also supported:

```typescript
// ...
import {Subscription} from 'rxjs';

// ...
class SomeComponent implements OnInit {
    busy: Subscription;

    // ...

    ngOnInit() {
        this.busy = this.http.get('...').subscribe();
    }
}
```

## Directive Syntax

The `ngBusy` directive expects a ***busy thing***, which means:
- A promise
- Or an Observable's subscription
- Or an array of them
- Or a configuration object

In other words, you may use flexible syntax:

```html
<!-- Simple syntax -->
<div [ngBusy]="busy"></div>
```

```html
<!-- Collection syntax -->
<div [ngBusy]="[busyA, busyB, busyC]"></div>
```

```html
<!-- Advanced syntax -->
<div [ngBusy]="{busy: busy, message: 'Loading...', backdrop: false, delay: 200, minDuration: 600}"></div>
```

## Options

| Option | Required | Default | Details |
| ---- | ---- | ---- | ---- |
| busy | Required | null | A busy thing (or an array of busy things) that will cause the loading indicator to show. |
| message | Optional | 'Please wait...' | The message to show in the indicator which will reflect the updated values as they are changed. |
| backdrop | Optional | true | A faded backdrop will be shown behind the indicator if true. |
| template | Optional | A default template string | If provided, the custom template will be shown in place of the default indicatory template. The scope can be augmented with a `{{message}}` field containing the indicator message text. |
| delay | Optional | 0 | The amount of time to wait until showing the indicator. Specified in milliseconds.
| minDuration | Optional | 0 | The amount of time to keep the indicator showing even if the busy thing was completed quicker. Specified in milliseconds.|
| wrapperClass | Optional | 'ng-busy' | The name(s) of the CSS classes to be applied to the wrapper element of the indicator. |


## Overriding Defaults

The default values of options can be overriden by configuring the provider of the `BusyModule`.

In the root application module, you can do this:

```typescript
import {NgModule} from '@angular/core';
import {BusyModule, BusyConfig} from 'angular2-busy';

@NgModule({
    imports: [
    	// ...
        BusyModule.forRoot(
        	new BusyConfig({
            	message: 'Don\'t panic!',
                backdrop: false,
                template: '<div>{{message}}</div>',
                delay: 200,
                minDuration: 600,
                wrapperClass: 'my-class'
            })
        )
    ],
	// ...
})
export class AppModule
```

If you face an error on Angular 4 like this:
 `ERROR in Error encountered resolving symbol values statically. Calling function 'BusyConfig', function calls are not supported. Consider replacing the function or lambda with a reference to an exported function,`
 , you can supply BusyConfig as a provider rather than performing a forRoot() call statically during the import. For example, in your app module:

```typescript
export function busyConfigFactory() {
  return new BusyConfig({
     template: '<div class="ng-busy-square-spinner"></div>'
  });
}
```
And in your `providers` array you can provide `BusyConfig` using the function above:
```typescript
providers: [ 
  ...
  { provide: BusyConfig, useFactory: busyConfigFactory } 
]
```

## FAQ

### The indicator's position is not inside the `ngBusy` container

You may add `position: relative` style to your `ngBusy` container.

### SystemJS Config?

You may need this in your `systemjs.config.js`:

```javascript
{
    paths: {
        'npm:': 'node_modules/'
    },
    map: {
        // ...
        'angular2-busy': 'npm:angular2-busy'
    },
    packages: {
        // ...
        'angular2-busy': {
            main: './index.js',
            defaultExtension: 'js'
        }
    }
}
```


## TODO

- Provide custom animations for the indicator

- Unit & E2E test

## Credits

Rewritten from [cgross](https://github.com/cgross)'s [angular-busy](https://github.com/cgross/angular-busy).

Inspired by [ajoslin](https://github.com/ajoslin)'s [angular-promise-tracker](https://github.com/ajoslin/angular-promise-tracker).

## LICENSE

This project is licensed under the MIT license. See the [LICENSE](https://github.com/devyumao/angular2-busy/blob/master/LICENSE) file for more info.
