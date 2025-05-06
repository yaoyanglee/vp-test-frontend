import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-label-text',
  standalone: true,
  imports: [],
  templateUrl: './label-text.component.html',
  styleUrl: './label-text.component.css'
})
export class LabelTextComponent {

  @Input() label!: string

}
