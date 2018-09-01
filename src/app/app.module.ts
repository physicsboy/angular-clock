import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClockComponent } from './components/clock/clock.component';
import { WordClockComponent } from './components/word-clock/word-clock.component';
import {AngularFittextModule} from 'angular-fittext';
import {HttpClientModule} from '@angular/common/http';
import { NewQlockComponent } from './components/new-qlock/new-qlock.component';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    WordClockComponent,
    NewQlockComponent,
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
