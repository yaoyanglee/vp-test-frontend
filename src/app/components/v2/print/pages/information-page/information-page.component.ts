import {Component, Input, OnChanges} from '@angular/core';
import {PatientData} from "../../../../../../types/summary/summary.types";
import {PaperComponent} from "../../components/paper/paper.component";
import {LetterHeadComponent} from "../../components/letter-head/letter-head.component";
import {PageHeaderComponent} from "../../components/page-header/page-header.component";
import {PageSectionComponent} from "../../components/page-section/page-section.component";
import {PageTableParentComponent} from "../../components/page-table/page-table-parent/page-table-parent.component";
import {CommonModule} from "@angular/common";
import {PaperDirective} from "../../../../../directives/paper.directive";
import {Patient} from "../../../../../../types/v2/patient.types";
import { LanguageService } from '../../../../../services/language.service';

@Component({
  selector: 'page-information',
  standalone: true,
  imports: [
    PaperComponent,
    LetterHeadComponent,
    PageHeaderComponent,
    PageSectionComponent,
    PageTableParentComponent,
    CommonModule,
    PaperDirective
  ],
  templateUrl: './information-page.component.html',
  styleUrl: './information-page.component.css'
})
export class InformationPageComponent implements OnChanges {

  @Input() patient!: Patient
  selectedLanguage: string = 'en'; // Default language
  sectionLabel: string = 'Medication'; // Default section label

  headings: any = {
    item: 'Item',
    conditions: 'Medical Conditions',
    frequency: 'Frequency',
    dosage: 'Dosage',
    instructions: 'Instructions'
  };

  constructor(private languageService: LanguageService) {
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
        frequency: 'Kekerapan',
        dosage: 'Dos',
        instructions: 'Arahan'
      };
    }
    else if (language === 'zh') {
      this.headings = {
        item: '项目',
        conditions: '医疗状况',
        frequency: '频率',
        dosage: '剂量',
        instructions: '说明'
      };
    }
    else if (language === 'ta') {
      this.headings = {
        item: 'பொருள்',
        conditions: 'மருத்துவ நிலை',
        frequency: 'வருடாந்திர அளவு',
        dosage: 'தவணை',
        instructions: 'வழிமுறைகள்'
      };
    } 
    else {
      this.headings = {
        item: 'Item',
        conditions: 'Medical Conditions',
        frequency: 'Frequency',
        dosage: 'Dosage',
        instructions: 'Instructions'
      };
    }
  }

  updateSectionLabel(language: string) {
    if (language === 'ms') {
      this.sectionLabel = 'Ubat';
    } 
    else if (language === 'zh') {
      this.sectionLabel = '药物';
    }
    else if (language === 'ta') {
      this.sectionLabel = 'மருந்து';
    }
    else {
      this.sectionLabel = 'Medication';
    }
  }
}
