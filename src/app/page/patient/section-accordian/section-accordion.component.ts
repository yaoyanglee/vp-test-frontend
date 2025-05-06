import {Component, OnInit, Input, TemplateRef} from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {CommonModule} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {RouterModule} from "@angular/router";
import {NzEmptyComponent} from "ng-zorro-antd/empty";


@Component({
  selector: 'app-section-accordion',
  standalone: true,
  imports: [
    NzIconModule,
    CommonModule,
    NzButtonComponent,
    RouterModule,
    NzEmptyComponent
  ],
  templateUrl: './section-accordion.component.html',
  styleUrl: './section-accordion.component.css'
})
export class SectionAccordionComponent implements OnInit{
  @Input() title!: string
  @Input() subtitle?: string
  @Input() titleActionButton: TemplateRef<any> | null = null

  @Input() forceEmpty:boolean = false
  @Input() emptyText: string = "Empty"

  @Input() isExpanded:boolean = true
  @Input() level:number = 1

  @Input() emptyFooter: TemplateRef<any> | null = null

  ngOnInit(): void {

  }

  changedExpanded(){
    this.isExpanded = !this.isExpanded;
  }

}
