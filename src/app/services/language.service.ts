import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSource = new BehaviorSubject<string>('en'); // Default language
  currentLanguage = this.languageSource.asObservable();

  changeLanguage(language: string) {
    this.languageSource.next(language);
  }
}
