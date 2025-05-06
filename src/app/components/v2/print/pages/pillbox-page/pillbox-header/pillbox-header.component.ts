import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'pillbox-header',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './pillbox-header.component.html',
  styleUrl: './pillbox-header.component.css'
})
export class PillboxHeaderComponent {

  @Input() label!:string

}
