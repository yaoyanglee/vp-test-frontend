import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PillboxComponent} from "./pillbox/pillbox.component";
import {PillboxWeek} from "../../../types/pillbox/PillboxDay.types";
import {ActivatedRoute, Router} from "@angular/router";
import axios from "axios";
import {environment} from "../../../environments/environment";
import DaySort from "../../../util/DaySort";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import moment from "moment";
import {NgIf} from "@angular/common";
import {PillboxTimeOfDay} from "../../../types/pillbox/PillboxTimeOfDay.types";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzPopoverDirective} from "ng-zorro-antd/popover";
import {NzCalendarComponent} from "ng-zorro-antd/calendar";
import {FormsModule} from "@angular/forms";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";

@Component({
  selector: 'app-schedule-component',
  standalone: true,
  imports: [
    PillboxComponent,
    NzButtonComponent,
    NzIconDirective,
    NgIf,
    NzDividerComponent,
    NzPopoverDirective,
    NzCalendarComponent,
    FormsModule,
    NzDatePickerComponent
  ],
  templateUrl: './schedule_tab.component.html',
  styleUrl: './schedule_tab.component.css'
})
export class Schedule_tabComponent implements OnInit {

  calendarViewable:boolean = false

  id:string = ""
  data:PillboxWeek
  days:string[] = []

  today:Date = new Date()

  dateOfInterest:Date = new Date()

  dayDisplay:string = ""
  dateDisplay:string = ""

  currentDisplayData?:PillboxTimeOfDay



  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) {

    this.today.setHours(0,0,0,0)

  }

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
        if(this.data){
          this.days = Object.keys(this.data).sort(DaySort)
        }
        console.log(this.days)

        /**
         * Sets date and day for the scheduler
         */
        this.updateDisplay()
      }
      setInfo().catch(console.error)
    })
  }


  /**
   * Method to validate if allowed to select date
   * @param date
   */
  // validateDate(date: Date):boolean{
  //       return this.today>=date
  // }
  validateDate = (date:Date):boolean => {
    return this.today>date
  }


  setNewDate(newDate: Date){
    if(newDate>=this.today){
      this.dateOfInterest = newDate
      this.updateDisplay()
    }
  }

  incrDayDelta(){
    this.dateOfInterest.setDate(this.dateOfInterest.getDate() + 1)
    this.updateDisplay()
  }

  decrDayDelta(){
    if(this.dateOfInterest.getDate() - this.today.getDate() > 0){
      this.dateOfInterest.setDate(this.dateOfInterest.getDate() - 1)
      this.updateDisplay()
    }
  }

  updateDisplay(){
    this.dayDisplay = moment(this.dateOfInterest).format("dddd")
    this.dateDisplay = moment(this.dateOfInterest).format("D MMMM YYYY")

    if(this.data !== undefined){
      // @ts-ignore
      this.currentDisplayData = this.data[this.dayDisplay]
    }
  }

}
