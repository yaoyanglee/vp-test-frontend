import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-page-section',
  standalone: true,
  imports: [],
  templateUrl: './page-section.component.html',
  styleUrl: './page-section.component.css'
})
export class PageSectionComponent {

  @Input() name:string = "Section"

}
