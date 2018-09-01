import { Component, OnInit } from '@angular/core';
import {ClockService} from '../../services/clock/clock.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  time;
  hours;
  mins;

  constructor(private clockService: ClockService) { }

  ngOnInit() {
    this.time = this.clockService.getCurrentTime().subscribe(val => {
      this.time = val;
    });

    this.hours = this.clockService.getHours().subscribe(val => {
      this.hours = val;
    });

    this.time = this.clockService.getMins().subscribe(val => {
      this.mins = val;
    });
  }

}
