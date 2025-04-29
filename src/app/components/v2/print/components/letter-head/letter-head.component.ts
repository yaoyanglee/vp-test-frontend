import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-letter-head',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './letter-head.component.html',
  styleUrl: './letter-head.component.css'
})
export class LetterHeadComponent {

}
