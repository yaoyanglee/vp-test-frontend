import {Component, Input, TemplateRef} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-page-table-parent',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './page-table-parent.component.html',
  styleUrl: './page-table-parent.component.css'
})
export class PageTableParentComponent {
  @Input() header: TemplateRef<any>
  @Input() body: TemplateRef<any>

  @Input() border:boolean = true

}
