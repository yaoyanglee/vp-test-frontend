import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {PillboxDrug} from "../../../../../types/pillbox/PillboxDrug.types";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {CommonModule} from "@angular/common";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {DrugIconComponent} from "../drug-icon/drug-icon.component";
import {PillboxDrugUOM} from "../../../../../types/pillbox/PillboxDrugUOM.types";

@Component({
  selector: 'app-drug-card',
  standalone: true,
  imports: [
    NzCardComponent,
    NzDividerComponent,
    CommonModule,
    NzIconDirective,
    NzButtonComponent,
    DrugIconComponent
  ],
  templateUrl: './drug-card.component.html',
  styleUrl: './drug-card.component.css'
})
export class DrugCardComponent {

  @Input() drug!:PillboxDrug

  expanded:boolean=true

  protected readonly Number = Number;

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  toggleExpand(){
    this.expanded = !this.expanded
    this.cdr.detectChanges()
  }

  isPluralDose(val:string, uom:PillboxDrugUOM):boolean{



    if(uom.toUpperCase() === "INJECTION"){
      return false
    }

    if(val.toUpperCase() === "ONE"){
      return false
    }

    if(Number(val) <= 1){
      return false
    }



    return true
  }


}
