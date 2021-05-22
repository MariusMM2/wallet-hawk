import {enableProdMode, LOCALE_ID} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {locale} from './app/app.config';
import {registerLocaleData} from '@angular/common';
import localeDa from '@angular/common/locales/da';

registerLocaleData(localeDa);

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, {
    providers: [
        {
            provide: LOCALE_ID,
            useValue: locale
        }
    ]
}).catch(err => console.error(err));
