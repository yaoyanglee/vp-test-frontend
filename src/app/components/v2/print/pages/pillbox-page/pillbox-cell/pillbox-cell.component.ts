import {Component, Input, OnInit} from '@angular/core';
import {DrugInfoSchedule} from "../../../../../../../types/summary/summary.types";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MedicineUom} from "../../../../../../../types/v2/medicine.types";
import {PillboxIconMode} from "../../../../../../../types/pillbox/PillboxIconMode.types";

export function normaliseUom(raw: string): MedicineUom {
  const key = raw?.trim().toLowerCase();
  // Build an array of the enum’s values: ["Bottle", "Tablet", …, "SC"]
  const allValues = Object.values(MedicineUom) as string[];

  // If it ends in "drop", normalize to DROP
  if (key.endsWith('drop')) {
    return MedicineUom.DROP;
  }

  else if (key.startsWith('capsule')) {
    return MedicineUom.CAPSULE
  }

  else if (key.startsWith('tablet')) {
    return MedicineUom.TABLET
  }

  // If it ends in "application", normalize to OINTMENT
  else if (key.endsWith('application')) {
    return MedicineUom.OINTMENT;
  }
  
  // Try to find a match where the lowercased enum value equals the input
  const match = allValues.find(u => u.toLowerCase() === key);

  if (match) {
    return match as MedicineUom;
  }

  return MedicineUom.TAG;
}

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
  private _uom!: MedicineUom;

  @Input()
  set uom(value: string | MedicineUom) {
    // Always convert to string first, then normalize
    this._uom = normaliseUom(String(value));
  }
  get uom(): MedicineUom {
    return this._uom;
  }

  @Input()pillboxMode: PillboxIconMode = PillboxIconMode.ICON_DEFAULT

  constructor() {}

  ngOnInit() {}

  range(n = this.maxCount): number[] {
    if (
      this.uom === MedicineUom.TABLET || 
      this.uom === MedicineUom.CAPSULE || 
      this.uom === MedicineUom.INJECTION || 
      this.uom === MedicineUom.OINTMENT || 
      this.uom === MedicineUom.POWDER || 
      this.uom === MedicineUom.PACKET
    ) {
      return Array.from(Array(Math.ceil(n)).keys());
    } else {
      return [0];
    }
  }
  

  protected readonly Array = Array;
  protected readonly MedicineUom = MedicineUom;
  protected readonly PillboxIconMode = PillboxIconMode;
}
