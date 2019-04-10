import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ParentComponent} from './parent/parent.component';
import {ChildComponent} from './child/child.component';
import {OtherComponent} from './other/other.component';
import {ProviderService} from './shared/services/provider.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    ChildComponent,
    OtherComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ProviderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
