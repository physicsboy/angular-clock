import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClockComponent } from './components/clock/clock.component';
import {AngularFittextModule} from 'angular-fittext';
import {HttpClientModule} from '@angular/common/http';
import { NewQlockComponent } from './components/new-qlock/new-qlock.component';
import { OptionsComponent } from './components/options/options.component';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    NewQlockComponent,
    OptionsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFittextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
