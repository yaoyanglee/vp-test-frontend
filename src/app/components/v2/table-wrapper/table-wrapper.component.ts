import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NzEmptyComponent} from "ng-zorro-antd/empty";

@Component({
  selector: 'app-table-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    NzEmptyComponent
  ],
  templateUrl: './table-wrapper.component.html',
  styleUrl: './table-wrapper.component.css'
})
export class TableWrapperComponent {

  @Input() isEmpty:boolean = false

  constructor(
  ) {
  }

}
