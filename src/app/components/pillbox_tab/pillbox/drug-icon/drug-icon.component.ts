import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {PillboxDrugUOM} from "../../../../../types/pillbox/PillboxDrugUOM.types";
import {CommonModule, NgIf} from "@angular/common";

@Component({
  selector: 'app-drug-icon',
  standalone: true,
  imports: [
    NgIf,
    CommonModule
  ],
  templateUrl: './drug-icon.component.html',
  styleUrl: './drug-icon.component.css'
})
export class DrugIconComponent implements OnInit{

  @Input() uom!:PillboxDrugUOM
  componentColourClass:string = ""

  ngOnInit() {
    switch (this.uom.toUpperCase()){
      case "INJECTION": {
        this.componentColourClass = "bg-yellow-50 text-yellow-700"
        break
      }
      case "TABS":
      case "TABLET": {
        this.componentColourClass = "bg-blue-50 text-blue-700"
        break
      }
      default: {
        this.componentColourClass = "bg-pink-50 text-pink-700"
      }
    }
  }



}
