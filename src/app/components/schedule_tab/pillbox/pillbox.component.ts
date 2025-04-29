import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NzCardComponent} from "ng-zorro-antd/card";
import {PillboxTimeOfDay} from "../../../../types/pillbox/PillboxTimeOfDay.types";
import {CommonModule} from "@angular/common";
import TimeOfDaySort from "../../../../util/TimeOfDaySort";
import {DrugCardComponent} from "./drug-card/drug-card.component";

@Component({
  selector: 'app-pillbox',
  standalone: true,
  imports: [
    NzCardComponent,
    CommonModule,
    DrugCardComponent
  ],
  templateUrl: './pillbox.component.html',
  styleUrl: './pillbox.component.css'
})
export class PillboxComponent implements OnInit, OnChanges{

  @Input() data!:PillboxTimeOfDay


  protected readonly Object = Object;
  protected readonly TimeOfDaySort = TimeOfDaySort;


  ngOnInit() {
    console.log(this.data)
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes)
  }
}
