import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {
} from "ng-zorro-antd/table";
import {NzOptionComponent, NzOptionGroupComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {CommonModule} from "@angular/common";
import {FormArray, FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormExtractorService} from "../../../../services/v2/formExtractor/form-extractor.service";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {PillboxUtilService} from "../../../../services/v2/pillboxUtil/pillbox-util.service";
import {DrugInfoSchedule} from "../../../../../types/summary/summary.types";
import {NzPopoverDirective} from "ng-zorro-antd/popover";
import {DragDropModule, CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {MedicineUom} from "../../../../../types/v2/medicine.types";

@Component({
  selector: 'app-pillbox-field',
  standalone: true,
  imports: [
    NzSelectComponent,
    NzOptionComponent,
    CommonModule,
    NzOptionGroupComponent,
    FormsModule,
    ReactiveFormsModule,
    NzButtonComponent,
    NzIconDirective,
    NzPopoverDirective,
    DragDropModule
  ],
  templateUrl: './pillbox-field.component.html',
  styleUrl: './pillbox-field.component.css'
})
export class PillboxFieldComponent implements OnInit{

  @Input() scheduleFormArray!:FormArray
  @Input() uom:string = "UOM"

  pillboxOption:string = 'daily'
  pillboxOptionChoices:string[] = ['daily', 'weekly']

  dowLabels:string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  constructor(
    protected formExtractor:FormExtractorService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private pillboxUtil: PillboxUtilService,
  ) {

  }

  ngOnInit() {
    if(this.scheduleFormArray.controls.length===7){
      this.pillboxOption='weekly'
    } else {
      this.pillboxOption='daily'
    }
  }

  detectChangeInPillboxScheduleType(){
    console.log(this.pillboxOption)


    if(this.pillboxOption===this.pillboxOptionChoices[0]){ // Daily
      //pass
    }

    if(this.pillboxOption===this.pillboxOptionChoices[1]){ // Weekly

      const newSchedule = this.pillboxUtil.tileSchedule(this.scheduleFormArray.value)
      this.scheduleFormArray.controls = []
      this.addDefinedDayToSchedule(...newSchedule)
    }
  }



  addDayToSchedule(n:number = 1){
    for(let i=0; i<n; i++){
      const newRow = this.fb.group({
        morning: 0,
        afternoon: 0,
        evening: 0
      })
      // Subscribe to new changes
      // This line is needed as new items to arr are not tracked by form group unless it is initiated from parent
      newRow.valueChanges.subscribe(_=>{this.scheduleFormArray.updateValueAndValidity()})
      this.scheduleFormArray.controls.push(newRow)
      // This is to trigger the valueChange event emitter on the overall form group
      this.scheduleFormArray.updateValueAndValidity()
    }
  }

  addDefinedDayToSchedule(...days:DrugInfoSchedule[]){
    days.map(schedule => {
      const newRow = this.fb.group({
        morning: schedule.morning,
        afternoon: schedule.afternoon,
        evening: schedule.evening
      })

      newRow.valueChanges.subscribe(_=>{this.scheduleFormArray.updateValueAndValidity()})
      this.scheduleFormArray.controls.push(newRow)
      this.scheduleFormArray.updateValueAndValidity()

    })
  }

  deleteIndexOfSchedule(index:number){
    if(this.scheduleFormArray.controls.length>1){ // Prevents deletion of item when there is only one
      this.scheduleFormArray.removeAt(index)
    }
  }


  getRowLabel(index:number):string{
    if(index===0 && this.scheduleFormArray.controls.length===1){
      return 'Everyday'
    }

    if(this.pillboxOption==='daily'){
      return `Day ${index+1}`
    } else {
      return this.dowLabels[index]
    }
  }


  handleRowDrag(event: CdkDragDrop<any>){
    moveItemInArray(this.scheduleFormArray.controls, event.previousIndex, event.currentIndex)
    this.scheduleFormArray.updateValueAndValidity()
  }



  protected readonly Object = Object;
  protected readonly MedicineUom = MedicineUom;
}
