import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ContactComponent } from './contact/contact.component';
import { OtherComponent } from './other/other.component';
import { ProviderService } from './shared/services/provider.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '',component: MainComponent },
  { path: 'users', component: MainComponent }
  
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ContactComponent,
    OtherComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule
   
  ],
  providers: [ProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
