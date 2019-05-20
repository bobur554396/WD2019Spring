import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ClassProvider } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProviderService } from './shared/services/provider.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ParentComponent } from './parent/parent.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './AuthInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule
  ],
  providers: [
    ProviderService,
    <ClassProvider> {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
