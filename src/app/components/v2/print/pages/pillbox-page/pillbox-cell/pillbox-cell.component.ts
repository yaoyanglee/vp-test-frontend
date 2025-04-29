import {Component, Input, OnInit} from '@angular/core';
import {DrugInfoSchedule} from "../../../../../../../types/summary/summary.types";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MedicineUom} from "../../../../../../../types/v2/medicine.types";
import {PillboxIconMode} from "../../../../../../../types/pillbox/PillboxIconMode.types";

@Component({
  selector: 'pillbox-cell',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage
  ],
  templateUrl: './pillbox-cell.component.html',
  styleUrl: './pillbox-cell.component.css'
})
export class PillboxCellComponent implements OnInit{

  @Input() schedule!: DrugInfoSchedule
  @Input() maxCount!:number

  @Input() uom!: MedicineUom

  @Input()pillboxMode: PillboxIconMode = PillboxIconMode.ICON_DEFAULT

  constructor(
  ) {
  }

  ngOnInit() {
  }

  /**
   * Method to get an array of indexed to length maxCount
   * Akin to python `range(n)`
   */
  range(n=this.maxCount):number[]{
    if(this.uom===MedicineUom.TABLET){
      return Array.from(Array(Math.ceil(n)).keys())
    } else {
      return [0]
    }
  }

  protected readonly Array = Array;
  protected readonly MedicineUom = MedicineUom;
  protected readonly PillboxIconMode = PillboxIconMode;
}
