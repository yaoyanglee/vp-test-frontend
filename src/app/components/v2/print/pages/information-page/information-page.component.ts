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
    },
    'application': { 
      en: 'Application',
      ms: 'Aplikasi',     
      zh: '应用',        
      ta: 'பயன்பாடு'  
    }
  };

  frequencyTranslationMap: Record<string, Record<string, string>> = {
    'OD': {
      en: 'Once a day',
      ms: 'Sekali sehari',
      zh: '每天一次',
      ta: 'ஒரு நாள் ஒருமுறை'
    },
    'ONCE': {
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
    },
    'Q8H': {
      en: 'Every 8 hours',
      ms: 'Setiap 8 jam',
      zh: '每8小时一次',
      ta: 'ஒவ்வொரு 8 மணி நேரத்திற்கும் ஒருமுறை'
    },
    'Q24H': { 
      en: 'Every 24 hours', 
      ms: 'Setiap 24 jam', 
      zh: '每24小时一次', 
      ta: 'ஒவ்வொரு 24 மணி நேரத்திற்கும் ஒருமுறை' 
    },
    'Q4H': { en: 'Every 4 hours', ms: 'Setiap 4 jam', zh: '每4小时一次', ta: 'ஒவ்வொரு 4 மணி நேரத்திற்கும் ஒருமுறை' },
    'Q6H': { en: 'Every 6 hours', ms: 'Setiap 6 jam', zh: '每6小时一次', ta: 'ஒவ்வொரு 6 மணி நேரத்திற்கும் ஒருமுறை' },
    'Q12H': { en: 'Every 12 hours', ms: 'Setiap 12 jam', zh: '每12小时一次', ta: 'ஒவ்வொரு 12 மணி நேரத்திற்கும் ஒருமுறை' }
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
    'pre-meal': { 
      en: 'Take before meal', 
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
    },
    'take on': { 
      en: 'Take on',
      ms: 'Ambil pada',      
      zh: '服用于',          
      ta: 'எடுத்துக்கொள்ளவும்' 
    }
  };

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
    // Ensure freq is a string before calling toUpperCase and other string methods
    const upperFreq = typeof freq === 'string' ? freq.toUpperCase().trim() : '';

    if (!upperFreq) {
        return freq || ''; // Return original null/undefined or empty string
    }

    const prnMatch = upperFreq.includes('PRN'); // Detect PRN presence anywhere

    // 1. Handle if the entire input is just "PRN"
    if (upperFreq === 'PRN') {
        return `(${this.translatePRN(lang)})`;
    }

    // 2. Try to match a base code (alphanumeric) and an optional qualifier in parentheses
    const freqMatchResult = upperFreq.match(/^([A-Z0-9]+)(?:\s*\(([^)]+)\))?/);

    if (!freqMatchResult) {
        // No standard base code matched (e.g., "As directed", "Take with food PRN")
        // Following your original logic, if no base code is matched, the original frequency is returned.
        // The PRN suffix (e.g., "(as needed)") is NOT appended in this case by your original structure.
        // If `freq` was "As directed PRN", it returns "As directed PRN".
        return freq;
    }

    // A base code was matched
    const base = freqMatchResult[1]; // e.g., "Q8H", "OD"
    const qualifierRaw = freqMatchResult[2]?.toLowerCase?.().trim(); // Content within parentheses

    // 3. Handle if the matched base code itself is "PRN" (e.g., from an input like "PRN (IF PAIN)")
    if (base === 'PRN') {
        const basePRNTranslation = `(${this.translatePRN(lang)})`;
        let qualifierDisplay = '';
        if (qualifierRaw) {
            const translatedQualifier = this.qualifierMap[qualifierRaw]?.[lang];
            qualifierDisplay = translatedQualifier ? `(${translatedQualifier})` : `(${qualifierRaw})`;
        }
        // This case fully handles "PRN" as a base, so the later prnMatch append is effectively skipped.
        return [basePRNTranslation, qualifierDisplay].filter(Boolean).join(' ').trim();
    }

    // 4. Regular base code translation (OD, Q8H, etc.)
    const baseTranslation = this.frequencyTranslationMap[base]?.[lang] || base;

    const parts: string[] = [baseTranslation];

    if (qualifierRaw) {
        const translatedQualifier = this.qualifierMap[qualifierRaw]?.[lang];
        if (translatedQualifier) {
            parts.push(`(${translatedQualifier})`);
        } else {
            // If qualifier is not in the map, use the raw qualifier text, wrapped in parentheses
            parts.push(`(${qualifierRaw})`);
        }
    }

    // 5. Append PRN translation if:
    //    - PRN was detected in the original string (`prnMatch` is true)
    //    - AND the base code handled was NOT "PRN" itself (which is covered in step 3).
    // This part is only reached if `freqMatchResult` was successful and base was not 'PRN'.
    if (prnMatch && base !== 'PRN') {
        parts.push(`(${this.translatePRN(lang)})`);
    }

    return parts.join(' ').trim();
  }

  translateDosage(dosage: string): string {
    if (!dosage) return dosage;

    const lang = this.selectedLanguage || 'en';
    let translated = dosage; // Start with the original dosage string

    // Iterate over known dosage forms/keywords to translate them
    for (const keyword in this.dosageTranslationMap) {
      // Use a regex to match whole words to avoid partial matches (e.g., 'in' in 'injection')
      // \b denotes a word boundary
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi'); // 'g' for global, 'i' for case-insensitive
      const translation = this.dosageTranslationMap[keyword]?.[lang];
      if (translation && regex.test(translated)) { // Check if keyword exists before replacing
        translated = translated.replace(regex, translation);
      }
    }
    return translated;
  }

  translateInstructions(instruction: string): string {
    if (!instruction) return instruction;

    const lang = this.selectedLanguage || 'en';
    let translated = instruction;

    // Sort keys by length descending to match longer phrases first
    const sortedInstructionKeys = Object.keys(this.instructionTranslationMap).sort((a, b) => b.length - a.length);

    for (const phrase of sortedInstructionKeys) {
      // Escape special regex characters in the phrase if any (though your current keys are simple)
      const escapedPhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedPhrase, 'gi'); // 'g' for global, 'i' for case-insensitive
      const translation = this.instructionTranslationMap[phrase]?.[lang];
      if (translation && regex.test(translated)) {
        translated = translated.replace(regex, translation);
      }
    }
    return translated;
  }
}
  