import {
  AfterViewChecked,
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {PaperComponent} from "../../components/paper/paper.component";
import {PatientData, Result} from "../../../../../../types/summary/summary.types";
import {PageTableParentComponent} from "../../components/page-table/page-table-parent/page-table-parent.component";
import {CommonModule} from "@angular/common";
import {PageSectionComponent} from "../../components/page-section/page-section.component";
import {PaperDirective} from "../../../../../directives/paper.directive";
import { LanguageService } from '../../../../../services/language.service';

@Component({
  selector: 'page-summary',
  standalone: true,
  imports: [
    PaperComponent,
    PageTableParentComponent,
    CommonModule,
    PageSectionComponent,
    PaperDirective
  ],
  templateUrl: './summary-page.component.html',
  styleUrl: './summary-page.component.css'
})
export class SummaryPageComponent implements AfterViewInit {

  @Input() patientData!: PatientData

  selectedLanguage: string = 'en'; // Default language
  sectionLabel: string = 'Additional Information'; // Default section label

  patientData2D:Result[][] = [[]]

  // @ViewChildren(PaperComponent) paperList: QueryList<PaperComponent>
  @ViewChildren(PaperComponent) paperList: QueryList<PaperComponent>

  headings: any = {
    item: 'Item',
    conditions: 'Medical Conditions',
    administration: 'Administration',
    side_effects: 'Common Side Effects',
    storage: 'Storage'
  };

  constructor(private cdr:ChangeDetectorRef, private languageService: LanguageService) {
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

  updateHeadings(language: string) {
    if (language === 'ms') {
      this.headings = {
        item: 'Perkara',
        conditions: 'Keadaan Perubatan',
        administration: 'Pentadbiran',
        side_effects: 'Kesan Sampingan Lazim',
        storage: 'Penyimpanan'
      };
    }
    else if (language === 'zh') {
      this.headings = {
        item: '项目',
        conditions: '医疗状况',
        administration: '管理',
        side_effects: '常見副作用',
        storage: '儲存'
      };
    }
    else if (language === 'ta') {
      this.headings = {
        item: 'பொருள்',
        conditions: 'மருத்துவ நிலை',
        administration: 'நிர்வாகம்',
        side_effects: 'பொதுவான பக்க விளைவுகள்',
        storage: 'சேமிப்பு'
      };
    } 
    else {
      this.headings = {
        item: 'Item',
        conditions: 'Medical Conditions',
        administration: 'Administration',
        side_effects: 'Common Side Effects',
        storage: 'Storage'
      };
    }
  }

  updateSectionLabel(language: string) {
    if (language === 'ms') {
      this.sectionLabel = 'Maklumat Tambahan';
    } 
    else if (language === 'zh') {
      this.sectionLabel = '附加信息';
    }
    else if (language === 'ta') {
      this.sectionLabel = 'கூடுதல் தகவல்';
    }
    else {
      this.sectionLabel = 'Additional Information';
    }
  }

  ngAfterViewInit() {
    this.addRows()
  }

  private addRows(){

    // Iterates over each drug
    for(let drug of this.patientData.results){

      // Gets latest latest state
      this.cdr.detectChanges()
      let currentPage = this.paperList.toArray()[this.patientData2D.length-1]

      // Pushes then update state
      this.patientData2D[this.patientData2D.length-1].push(drug)
      this.cdr.detectChanges()

      // If page overflows and there is >= 2 rows,
      // remove last row and push to next page
      if(currentPage.isOverflow() && this.patientData2D[this.patientData2D.length-1].length>1){
        this.patientData2D[this.patientData2D.length-1].pop()
        this.patientData2D.push([drug])
      }
    }
  }

}
