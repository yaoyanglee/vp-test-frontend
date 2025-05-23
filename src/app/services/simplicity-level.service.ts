import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Define a type for clarity, can be 'Normal' or 'Simplified'
export type SimplicityLevel = 'Normal' | 'Simplified';

@Injectable({
  providedIn: 'root'
})
export class SimplicityLevelService {
  private simplicityLevelSource = new BehaviorSubject<SimplicityLevel>('Normal'); // Default simplicity level
  currentSimplicityLevel = this.simplicityLevelSource.asObservable();

  changeSimplicityLevel(level: SimplicityLevel) {
    this.simplicityLevelSource.next(level);
  }
}