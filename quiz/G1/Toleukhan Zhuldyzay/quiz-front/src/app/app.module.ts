import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProviderService } from './app/provider.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthInterceptor} from './AuthInterceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ParentComponent } from './parent/parent/parent.component';
import { ChildComponent } from './child/child.component';
import { OtherComponent } from './other/other.component';
@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    ChildComponent,
    OtherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClient
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
export class AppModule { }
