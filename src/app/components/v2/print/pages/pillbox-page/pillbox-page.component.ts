import {ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {PaperComponent} from "../../components/paper/paper.component";
import {DrugInfo, DrugInfoSchedule, PatientData, Result} from "../../../../../../types/summary/summary.types";
import {PageSectionComponent} from "../../components/page-section/page-section.component";
import {TableWrapperComponent} from "../../../table-wrapper/table-wrapper.component";
import {PageTableParentComponent} from "../../components/page-table/page-table-parent/page-table-parent.component";
import {PillboxHeaderComponent} from "./pillbox-header/pillbox-header.component";
import {CommonModule} from "@angular/common";
import {PillboxCellComponent} from "./pillbox-cell/pillbox-cell.component";
import {PaperDirective} from "../../../../../directives/paper.directive";
import {PillboxUtilService} from "../../../../../services/v2/pillboxUtil/pillbox-util.service";
import {MedicineUom} from "../../../../../../types/v2/medicine.types";
import {PillboxIconMode} from "../../../../../../types/pillbox/PillboxIconMode.types";
import { LanguageService } from '../../../../../services/language.service';

@Component({
  selector: 'page-pillbox',
  standalone: true,
  imports: [
    PaperComponent,
    PageSectionComponent,
    TableWrapperComponent,
    PageTableParentComponent,
    PillboxHeaderComponent,
    CommonModule,
    PillboxCellComponent,
    PaperDirective
  ],
  templateUrl: './pillbox-page.component.html',
  styleUrl: './pillbox-page.component.css'
})
export class PillboxPageComponent implements OnInit{

  @Input() patientData!: PatientData

  selectedLanguage: string = 'en'; // Default language
  sectionLabel: string = 'Schedule'; // Default section label

  headings: any = {
    item: 'Item',
    mon: 'Monday',
    tues: 'Tuesday',
    wed: 'Wednesday',
    thurs: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
    sun: 'Sunday'
  };

  @ViewChildren(PaperComponent) paperList: QueryList<PaperComponent>

  pillboxMode: PillboxIconMode

  patientData2D: DrugInfo[][] = [[]]

  constructor(private cdr: ChangeDetectorRef, private pillboxUtil: PillboxUtilService, private languageService: LanguageService) {
    this.languageService.currentLanguage.subscribe(language => {
      this.selectedLanguage = language;
      this.updateHeadings(language);
      this.updateSectionLabel(language);
    });
  }

  ngOnChanges() {
    this.updateHeadings(this.selectedLanguage);
    this.updateSectionLabel(this.selectedLanguage);
  }

  ngOnInit(){
    this.addRows()

    // Subscribe to pillbox view mode changes and re-render
    this.pillboxUtil.$viewMode.subscribe(val => {
      this.pillboxMode=val // setValue
      this.patientData2D=[[]] // empty current array
      this.addRows() // add in the rows again to make sure they fit
    })
  }

  updateHeadings(language: string) {
    if (language === 'ms') {
        this.headings = {
          item: 'Perkara',
          mon: 'Isnin',
          tues: 'Selasa',
          wed: 'Rabu',
          thurs: 'Khamis',
          fri: 'Jumaat',
          sat: 'Sabtu',
          sun: 'Ahad'
        };
      }
      else if (language === 'zh') {
        this.headings = {
        item: '项目',
        mon: '星期一',
        tues: '星期二',
        wed: '星期三',
        thurs: '星期四',
        fri: '星期五',
        sat: '星期六',
        sun: '星期日'
        };
      }
      else if (language === 'ta') {
        this.headings = {
        item: 'பொருள்',
        mon: 'திங்கள்',
        tues: 'செவ்வாய்',
        wed: 'புதன்',
        thurs: 'வியாழன்',
        fri: 'வெள்ளி',
        sat: 'சனி',
        sun: 'ஞாயிறு'
        };
      }
      else {
        this.headings = {
        item: 'Item',
        mon: 'Monday',
        tues: 'Tuesday',
        wed: 'Wednesday',
        thurs: 'Thursday',
        fri: 'Friday',
        sat: 'Saturday',
        sun: 'Sunday'
        };
      }
  }

  updateSectionLabel(language: string) {
    if (language === 'ms') {
      this.sectionLabel = 'Jadual';
    } 
    else if (language === 'zh') {
      this.sectionLabel = '日程';
    }
    else if (language === 'ta') {
      this.sectionLabel = 'அட்டவணை';
    }
    else {
      this.sectionLabel = 'Schedule';
    }
  }

  getMaxPills(drugInfo:DrugInfo):number{
    let max:number = 0

    drugInfo.schedule.forEach(day => {
      max = Math.max(max, day.morning, day.afternoon, day.evening)
    })

    return max
  }

  tileSchedule(baseSchedule:DrugInfoSchedule[], length:number=7): DrugInfoSchedule[]{
    return this.pillboxUtil.tileSchedule(baseSchedule, length)
  }

  private addRows(){

    const sortedRows:DrugInfo[] = this.patientData.info.sort((a, b) => {
      const targetOrder = [MedicineUom.TABLET, MedicineUom.SYRUP, MedicineUom.INJECTION]

      return targetOrder.indexOf(a.uom) - targetOrder.indexOf(b.uom)
    })

    for(let drug of sortedRows){
      this.cdr.detectChanges()

      let currentPage = this.paperList.toArray()[this.patientData2D.length-1]

      this.patientData2D[this.patientData2D.length-1].push(drug)
      this.cdr.detectChanges()

      if(currentPage.isOverflow() && this.patientData2D[this.patientData2D.length-1].length>1){
        this.patientData2D[this.patientData2D.length-1].pop()
        this.patientData2D.push([drug])
      }
    }

  }


  protected readonly Array = Array;
}
