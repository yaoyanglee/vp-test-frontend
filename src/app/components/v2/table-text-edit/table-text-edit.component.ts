import {Component, Input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-table-text-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './table-text-edit.component.html',
  styleUrl: './table-text-edit.component.css'
})
export class TableTextEditComponent {

  @Input() control!: FormControl

}
