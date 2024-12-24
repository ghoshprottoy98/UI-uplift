import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LayoutModule} from './layout/layout.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AppInterceptor} from "../helper/app-interceptor";
import {AppConfigService} from "./app.config.service";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {NgxSpinnerComponent} from "ngx-spinner";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from "@angular/material/form-field";


export function initApp(configurator: AppConfigService) {
  return () => configurator.init();
}

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: AppConfigService.getIdpConfig(),
      initOptions: {
        checkLoginIframe: false,
        onLoad: 'login-required',  // allowed values 'login-required', 'check-sso';
        flow: "standard"          // allowed values 'standard', 'implicit', 'hybrid';
      },
      shouldAddToken: (request) => {
        const {method, url} = request;

        const isGetRequest = 'GET' === method.toUpperCase();
        const acceptablePaths = ['/assets', '/clients/public', '*'];
        const isAcceptablePathMatch = acceptablePaths.some((path) =>
          url.includes(path)
        );

        return !(isGetRequest && isAcceptablePathMatch);
      }
    });
}


const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    KeycloakAngularModule,
    LayoutModule,
    NgxSpinnerComponent,
    // FormlyModule.forRoot({ extras: { lazyRender: true }}),
    ReactiveFormsModule,
    // FormlyModule.forRoot(),
    FormlyModule.forRoot({
      validationMessages: [{ name: 'required', message: 'This field is required' }],
      // types: [{ name: 'custom', component: CustomFieldType, wrappers: ['form-field'] }],
    }),
    FormlyMaterialModule
  ],
  providers: [
    AppConfigService,
    {provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true},
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [AppConfigService],
      multi: true
    },
      {
        provide: APP_INITIALIZER,
        useFactory: initializeKeycloak,
        multi: true,
        deps: [KeycloakService],
      },
      {
        provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
        useValue: appearance
      },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
