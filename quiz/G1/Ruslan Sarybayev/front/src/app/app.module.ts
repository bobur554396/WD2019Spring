import {BrowserModule} from '@angular/platform-browser';
import {ClassProvider, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ParentComponent} from './parent/parent.component';
import {ProviderService} from './shared/services/provider.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthInterceptor} from './AuthInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ProviderService,
    <ClassProvider> {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
