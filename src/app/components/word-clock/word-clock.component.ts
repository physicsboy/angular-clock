import {AfterViewInit, Component} from '@angular/core';
import * as converter from 'number-to-words';
import {ClockService} from '../../services/clock/clock.service';

@Component({
  selector: 'app-word-clock',
  templateUrl: './word-clock.component.html',
  styleUrls: ['./word-clock.component.css']
})
export class WordClockComponent implements AfterViewInit {

  seconds: string;
  minutes: string;
  hours: string;

  constructor(private clockService: ClockService) { }

  ngAfterViewInit() {
    this.clockService.getCurrentTime().subscribe(time => {
      this.seconds = this.numToWord(time.getSeconds());
      this.minutes = this.numToWord(time.getMinutes());
      this.hours = this.numToWord(this.twelveHours(time.getHours()));
    });
  }

  twelveHours(num: number): number {
    if (num > 12) {
      return num - 12;
    }
    return num;
  }

  numToWord(num: number): string {
    return converter.toWords(num);
  }

}
