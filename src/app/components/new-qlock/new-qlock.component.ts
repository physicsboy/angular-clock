import {Component, Input, OnInit} from '@angular/core';
import {FileLoaderService} from '../../services/file-loader/file-loader.service';
import {interval} from 'rxjs';
import {ClockService} from '../../services/clock/clock.service';

@Component({
  selector: 'app-new-qlock',
  templateUrl: './new-qlock.component.html',
  styleUrls: ['./new-qlock.component.css']
})
export class NewQlockComponent implements OnInit {

  @Input() time;
  @Input() hours;
  @Input() mins;

  hourPlusOne: number;
  data;
  dataUrl = '../../../assets/all.json';

  constructor(private file: FileLoaderService, private clock: ClockService) {
  }

  ngOnInit() {
    this.file.getData(this.dataUrl).subscribe(data => {
      this.data = data;
    });


    interval(1000).subscribe(() => {
      // this.itIs();
      this.resetMins()
      this.checkMins();
      this.checkHours();
      this.checkOclock();
    });
  }

  itIs() {
    for (let i = 0; i < 1; i++) {
      this.activate(this.data.one[i]);
    }
    for (let i = 3; i < 4; i++) {
      this.activate(this.data.one[i]);
    }
  }

  pastToHour(): number {
    if (this.mins > 30) {
      this.hours === 23 ? this.hourPlusOne = 0 : this.hourPlusOne = this.hours + 1;
      console.log(this.hourPlusOne);
      return this.hourPlusOne;
    }
    console.log(this.hours);
    return this.hours;
  }

  get getDataKeys() {
    return Object.keys(this.data);
  }

  private activate(char) {
    char.isActive = true;
  }

  private deactivate(char) {
    char.isActive = false;
  }

  private resetMins() {
    const line = this.data;
    for (let i = 0; i <= 10; i++) {
      this.deactivate(line.two[i]);
      this.deactivate(line.three[i]);
      this.deactivate(line.four[i]);
      this.deactivate(line.five[i]);
      this.deactivate(line.six[i]);
      this.deactivate(line.seven[i]);
      this.deactivate(line.eight[i]);
      this.deactivate(line.nine[i]);
      this.deactivate(line.ten[i]);
    }
  }

  checkMins() {
    // five
    if (this.isThisMins(5) || this.isThisMins(25)) {
      for (let i = 6; i <= 9; i++) {
        this.activate(this.data.three[i]);
      }
    }
    // ten
    if (this.isThisMins(10)) {
      for (let i = 5; i <= 7; i++) {
        this.activate(this.data.four[i]);
      }
    }
    // quarter
    if (this.isThisMins(15)) {
      for (let i = 2; i <= 8; i++) {
        this.activate(this.data.two[i]);
      }
    }
    // twenty
    if (this.isThisMins(20) || this.isThisMins(25)) {
      for (let i = 0; i <= 5; i++) {
        this.activate(this.data.three[i]);
      }
    }
    // half
    if (this.isThisMins(30)) {
      for (let i = 0; i <= 3; i++) {
        this.activate(this.data.four[i]);
      }
    }
    // Past or To?
    this.pastTo();
  }

  checkHours() {
    switch (this.pastToHour()) {
      case 1:
      case 13:
        for (let i = 0; i <= 2; i++) { this.activate(this.data.six[i]); }
        break;
      case 2:
      case 14:
        for (let i = 8; i <= 10; i++) { this.activate(this.data.seven[i]); }
        break;
      case 3:
      case 15:
        for (let i = 6; i <= 10; i++) { this.activate(this.data.six[i]); }
        break;
      case 4:
      case 16:
        for (let i = 0; i <= 3; i++) { this.activate(this.data.seven[i]); }
        break;
      case 5:
      case 17:
        for (let i = 4; i <= 7; i++) { this.activate(this.data.seven[i]); }
        break;
      case 6:
      case 18:
        for (let i = 3; i <= 5; i++) { this.activate(this.data.six[i]); }
        break;
      case 7:
      case 19:
        for (let i = 0; i <= 4; i++) { this.activate(this.data.nine[i]); }
        break;
      case 8:
      case 20:
        for (let i = 0; i <= 4; i++) { this.activate(this.data.eight[i]); }
        break;
      case 9:
      case 21:
        for (let i = 7; i <= 10; i++) { this.activate(this.data.five[i]); }
        break;
      case 10:
      case 22:
        for (let i = 0; i <= 2; i++) { this.activate(this.data.ten[i]); }
        break;
      case 11:
      case 23:
        for (let i = 5; i <= 10; i++) { this.activate(this.data.eight[i]); }
        break;
      case 12:
      case 0:
        for (let i = 5; i <= 10; i++) { this.activate(this.data.nine[i]); }
        break;
    }
  }

  checkOclock() {
    for (let i = 5; i <= 10; i++) {
      this.mins === 0 ? this.activate(this.data.ten[i]) : this.deactivate(this.data.ten[i]);
    }
  }

  pastTo() {
    if (!this.firstFiveMins()) {
      // Past
      if (this.mins < 35) {
        for (let i = 0; i <= 3; i++) {
          this.activate(this.data.five[i]);
        }
      }

      if (this.mins > 35) {
        // To
        for (let i = 9; i <= 10; i++) {
          this.activate(this.data.four[i]);
        }
      }
    }
  }

  firstFiveMins() {
    return this.mins >= 0 && this.mins < 5;
  }

  isThisMins(num: number) {
    const timePast = this.mins >= num && this.mins < num + 5;
    const timeTo = this.mins >= 60 - num && this.mins < 65 - num;
    return timePast || timeTo;
  }

  isThisHours(time, num: number) {
    return this.hours === num || this.hours === 12 + num;
  }

}
