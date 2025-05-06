import {ChangeDetectorRef, Component, Input, NgZone, OnDestroy, OnInit} from '@angular/core';
import moment, {Moment} from "moment";

@Component({
  selector: 'app-moment-time-since',
  standalone: true,
  imports: [],
  templateUrl: './moment-time-since.component.html',
  styleUrl: './moment-time-since.component.css'
})
export class MomentTimeSinceComponent implements OnInit, OnDestroy{
  @Input() time!: string | Moment

  private timer:any
  relativeTime: string = ""

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
  }

  ngOnInit() {
    this.updateTime();
    this.ngZone.runOutsideAngular(() => {
      this.timer = setInterval(() => {
        this.ngZone.run(() => {
          this.updateTime();
          // Now we're explicitly telling Angular to check for updates in this component
          this.cdr.detectChanges();
        });
      }, Math.floor(Math.random()*30000)+15000); // update every 30-45s
    });
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  updateTime(){
      this.relativeTime = moment(this.time).fromNow(true)
  }


}
