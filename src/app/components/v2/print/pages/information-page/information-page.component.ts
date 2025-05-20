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
<<<<<<< HEAD
  
  qualifierMap: Record<string, Record<string, string>> = {
    'with meal': {
      en: 'with meal',
      ms: 'dengan makanan',
      zh: '配餐',
      ta: 'உணவுடன்'
    },
    'before meal': {
      en: 'before meal',
      ms: 'sebelum makan',
      zh: '饭前',
      ta: 'உணவிற்கு முன்'
    },
    'pre-meal': {
      en: 'before meal',
      ms: 'sebelum makan',
      zh: '饭前',
      ta: 'உணவிற்கு முன்'
    },
    'after meal': {
      en: 'after meal',
      ms: 'selepas makan',
      zh: '饭后',
      ta: 'உணவுக்குப் பிறகு'
    }
  };
  dosageTranslationMap: Record<string, Record<string, string>> = {
    'injection': {
      en: 'Injection',
      ms: 'Suntikan',
      zh: '注射',
      ta: 'உளுத்துதல்'
    },
    'inhalation': {
      en: 'Inhalation',
      ms: 'Penyedutan',
      zh: '吸入',
      ta: 'மூச்சுவிடுதல்'
    },
    'tablet': {
      en: 'Tablet',
      ms: 'Tablet',
      zh: '药片',
      ta: 'மருந்து மாத்திரை'
    },
    'capsule': {
      en: 'Capsule',
      ms: 'Kapsul',
      zh: '胶囊',
      ta: 'காப்சூல்'
    },
    'drop': {
      en: 'Drop',
      ms: 'Titis',
      zh: '滴',
      ta: 'துளி'
    },
    'puff': {
      en: 'Puff',
      ms: 'Semburan',
      zh: '喷',
      ta: 'பஃப்'
    },
    'unit': {
      en: 'Unit',
      ms: 'Unit',
      zh: '单位',
      ta: 'அலகு'
    },
    'lozenge': {
      en: 'Lozenge',
      ms: 'Lozeng',
      zh: '含片',
      ta: 'தொண்டை மாத்திரை'
    }
  };

  frequencyTranslationMap: Record<string, Record<string, string>> = {
    'OD': {
      en: 'Once a day',
      ms: 'Sekali sehari',
      zh: '每天一次',
      ta: 'ஒரு நாள் ஒருமுறை'
    },
    'OM': {
      en: 'Once in the morning',
      ms: 'Sekali pada waktu pagi',
      zh: '早上一次',
      ta: 'காலை ஒருமுறை'
    },
    'BD': {
      en: 'Twice a day',
      ms: 'Dua kali sehari',
      zh: '每天两次',
      ta: 'ஒரு நாளில் இரண்டு முறை'
    },
    'TDS': {
      en: 'Three times a day',
      ms: 'Tiga kali sehari',
      zh: '每天三次',
      ta: 'ஒரு நாளில் மூன்று முறை'
    },
    'QDS': {
      en: 'Four times a day',
      ms: 'Empat kali sehari',
      zh: '每天四次',
      ta: 'ஒரு நாளில் நான்கு முறை'
    },
    'ON': {
      en: 'Once at night',
      ms: 'Sekali waktu malam',
      zh: '晚上一次',
      ta: 'இரவில் ஒரு முறை'
    }
  };
  instructionTranslationMap: Record<string, Record<string, string>> = {
    'start on': {
      en: 'Start on',
      ms: 'Mulakan pada',
      zh: '开始于',
      ta: 'தொடங்குக'
    },
    'take before meals': {
      en: 'Take before meals',
      ms: 'Ambil sebelum makan',
      zh: '饭前服用',
      ta: 'உணவிற்கு முன் எடுத்துக்கொள்ளவும்'
    },
    'take after meals': {
      en: 'Take after meals',
      ms: 'Ambil selepas makan',
      zh: '饭后服用',
      ta: 'உணவுக்குப் பிறகு எடுத்துக்கொள்ளவும்'
    },
    'when required': {
      en: 'When required',
      ms: 'Apabila diperlukan',
      zh: '如有需要时',
      ta: 'தேவையானபோது'
    }
  };
=======

>>>>>>> b4bbb4dd47a0254c8dde27dbb5d19471d2e4a5c8
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
<<<<<<< HEAD
  translatePRN(lang: string): string {
    const prnMap: Record<string, string> = {
      en: 'as needed',
      ms: 'jika perlu',
      zh: '有需要时',
      ta: 'தேவையெனில்'
    };
    return prnMap[lang] || 'as needed';
  }


  refineAndTranslateFrequency(freq: string): string {
    const lang = this.selectedLanguage || 'en';
    const upperFreq = freq?.toUpperCase?.() ?? '';

    const prnMatch = upperFreq.includes('PRN');
    const freqMatch = upperFreq.match(/^([A-Z]+)(?:\s*\(([^)]+)\))?/);

    if (!freqMatch) return freq;

    const base = freqMatch[1]; 
    const qualifierRaw = freqMatch[2]?.toLowerCase?.().trim();

    const baseTranslation = this.frequencyTranslationMap[base]?.[lang] || base;

    let qualifierTranslation = '';
    if (qualifierRaw && this.qualifierMap[qualifierRaw]) {
      qualifierTranslation = this.qualifierMap[qualifierRaw]?.[lang] ?? `(${qualifierRaw})`;
    }

    const parts: string[] = [baseTranslation];
    if (qualifierTranslation) parts.push(`(${qualifierTranslation})`);
    if (prnMatch) parts.push(`(${this.translatePRN(lang)})`);

    return parts.join(' ');
  }
  translateDosage(dosage: string): string {
    if (!dosage) return dosage;

    const lang = this.selectedLanguage || 'en';
    let translated = dosage;

    for (const keyword in this.dosageTranslationMap) {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi'); 
      const translation = this.dosageTranslationMap[keyword]?.[lang];
      if (translation) {
        translated = translated.replace(regex, translation);
      }
    }

    return translated;
  }
  translateInstructions(instruction: string): string {
    if (!instruction) return instruction;

    const lang = this.selectedLanguage || 'en';
    let translated = instruction;

    for (const phrase in this.instructionTranslationMap) {
      const regex = new RegExp(phrase, 'gi');
      const translation = this.instructionTranslationMap[phrase]?.[lang];
      if (translation) {
        translated = translated.replace(regex, translation);
      }
    }

    return translated;
  }
  }
=======
}
>>>>>>> b4bbb4dd47a0254c8dde27dbb5d19471d2e4a5c8
