import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzNotificationModule} from "ng-zorro-antd/notification";
import {NgxIndexedDBModule} from "ngx-indexed-db";
import {CacheIndexedDbConfig} from "./app.indexed-db.config";

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(NzModalModule),
    importProvidersFrom(NzNotificationModule),
    importProvidersFrom(NgxIndexedDBModule.forRoot(CacheIndexedDbConfig))
  ]
};
