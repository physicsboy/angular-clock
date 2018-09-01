import { Injectable } from '@angular/core';
import {interval, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  timeTo;
  timePast;
  clock: Observable<Date>;
  hours: Observable<number>;
  mins: Observable<number>;

  constructor() {
    this.clock = interval(1000).pipe(map(() => new Date()));
    this.hours = interval(1000).pipe(map(() => new Date().getHours()));
    this.mins = interval(1000).pipe(map(() => new Date().getMinutes()));
  }

  getCurrentTime() {
    return this.clock;
  }

  getHours() {
    return this.hours;
  }

  getMins() {
    return this.mins;
  }

  isThisMins(time, num: number) {
    this.timePast = time >= num && time < num + 5;
    this.timeTo = time >= 60 - num && time < 65 - num;
    return this.timePast || this.timeTo;
  }

  isThisHours(time, num: number) {
    return time === num || time === 12 + num;
  }
}
