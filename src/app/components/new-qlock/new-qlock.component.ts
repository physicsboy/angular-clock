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
  // mins = 0;
  // hours = 0;

  data;
  dataUrl = '../../../assets/all.json';

  constructor(private file: FileLoaderService, private clock: ClockService) {
  }

  ngOnInit() {
    this.file.getData(this.dataUrl).subscribe(data => {
      this.data = data;
    });

    interval(1000).subscribe(() => {
      this.checkMins();
      this.checkHours();
      this.checkOclock();
    });
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

  private isThisMins(num: number) {
    return this.clock.isThisMins(this.mins, num);
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
    this.resetMins();
    const mins = this.mins;

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
    // One
    for (let i = 0; i <= 2; i++) {
      this.clock.isThisHours(this.hours, 1) ? this.activate(this.data.six[i]) : this.deactivate(this.data.six[i]);
    }
    // Two
    for (let i = 8; i <= 10; i++) {
      this.clock.isThisHours(this.hours, 2) ? this.activate(this.data.seven[i]) : this.deactivate(this.data.seven[i]);
    }
    // Three
    for (let i = 6; i <= 10; i++) {
      this.clock.isThisHours(this.hours, 3) ? this.activate(this.data.six[i]) : this.deactivate(this.data.six[i]);
    }
    // Four
    for (let i = 0; i <= 3; i++) {
      this.clock.isThisHours(this.hours, 4) ? this.activate(this.data.seven[i]) : this.deactivate(this.data.seven[i]);
    }
    // Five
    for (let i = 4; i <= 7; i++) {
      this.clock.isThisHours(this.hours, 5) ? this.activate(this.data.seven[i]) : this.deactivate(this.data.seven[i]);
    }
    // Six
    for (let i = 3; i <= 5; i++) {
      this.clock.isThisHours(this.hours, 6) ? this.activate(this.data.six[i]) : this.deactivate(this.data.six[i]);
    }
    // Seven
    for (let i = 0; i <= 5; i++) {
      this.clock.isThisHours(this.hours, 7) ? this.activate(this.data.nine[i]) : this.deactivate(this.data.nine[i]);
    }
    // Eight
    for (let i = 0; i <= 4; i++) {
      this.clock.isThisHours(this.hours, 8) ? this.activate(this.data.eight[i]) : this.deactivate(this.data.eight[i]);
    }
    // Nine
    for (let i = 7; i <= 10; i++) {
      this.clock.isThisHours(this.hours, 9) ? this.activate(this.data.five[i]) : this.deactivate(this.data.five[i]);
    }
    // Ten
    for (let i = 0; i <= 2; i++) {
      this.clock.isThisHours(this.hours, 10) ? this.activate(this.data.ten[i]) : this.deactivate(this.data.ten[i]);
    }
    // Eleven
    for (let i = 5; i <= 10; i++) {
      this.clock.isThisHours(this.hours, 11) ? this.activate(this.data.eight[i]) : this.deactivate(this.data.eight[i]);
    }
    // Twelve
    for (let i = 5; i <= 10; i++) {
      this.clock.isThisHours(this.hours, 12) || this.hours === 0 ? this.activate(this.data.nine[i]) : this.deactivate(this.data.nine[i]);
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
      for (let i = 0; i <= 3; i++) {
        this.mins <= 30 ? this.activate(this.data.five[i]) : this.deactivate(this.data.five[i]);
      }
      // To
      for (let i = 9; i <= 10; i++) {
        this.mins > 30 ? this.activate(this.data.four[i]) : this.deactivate(this.data.four[i]);
      }
    }
  }

  firstFiveMins() {
    return this.mins >= 0 && this.mins < 5;
  }

}
