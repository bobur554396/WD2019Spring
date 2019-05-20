import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ClassProvider } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ProvidersFeature } from '@angular/core/src/render3';
import { ProviderService } from './main/services/provider.service';
import { AuthInterceptor } from './AuthInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProviderService,
              <ClassProvider> {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptor,
                multi: true
              }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
