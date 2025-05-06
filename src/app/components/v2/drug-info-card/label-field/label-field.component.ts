import {Component, Input, TemplateRef} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {twMerge} from "tailwind-merge";
import {NzInputDirective} from "ng-zorro-antd/input";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-label-field',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzInputDirective,
    CommonModule
  ],
  templateUrl: './label-field.component.html',
  styleUrl: './label-field.component.css'
})
export class LabelFieldComponent {

  @Input() formControlReference?: FormControl
  @Input() label!: string

  @Input() extraClass:string = ''


  discriminator:string = `-LABEL-DATA-${Math.floor(Math.random() * 1000000)}`



}
