import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PillboxWeek} from "../../../types/pillbox/PillboxDay.types";
import {NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCalendarComponent} from "ng-zorro-antd/calendar";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzPopoverDirective} from "ng-zorro-antd/popover";
import {PillboxComponent} from "../../components/schedule_tab/pillbox/pillbox.component";
import {PillboxTimeOfDay} from "../../../types/pillbox/PillboxTimeOfDay.types";
import {Schedule_tabComponent} from "../../components/schedule_tab/schedule_tab.component";
import axios from "axios";
import {environment} from "../../../environments/environment";
import DaySort from "../../../util/DaySort";
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {NzUploadFile} from "ng-zorro-antd/upload";

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    NgIf,
    NzButtonComponent,
    NzCalendarComponent,
    NzDividerComponent,
    NzIconDirective,
    NzPopoverDirective,
    PillboxComponent,
    Schedule_tabComponent,
    NzTabSetComponent,
    NzTabComponent
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class SchedulePageComponent implements OnInit {

  id:string = ""
  data:PillboxWeek


  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router
  ){}

  ngOnInit() {
    /**
     * Fetch data from backend
     */
    this.activatedRoute.params.subscribe(params => {
      // Get activated sub route (id)
      this.id = params['id']
      // Async call backend for JSON
      const setInfo = async () => {
        // Make API call
        const res = await axios.get<PillboxWeek>(`${environment.BACKEND}/select/${this.id}`)
        // Sets data
        this.data = res.data
        // Set keys for the days present
        // if(this.data){
        //   this.days = Object.keys(this.data).sort(DaySort)
        // }
        // console.log(this.days)

        /**
         * Sets date and day for the scheduler
         */
        // this.updateDisplay()
      }
      setInfo().catch(console.error)
    })
  }

}
