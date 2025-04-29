import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {LetterHeadComponent} from "../letter-head/letter-head.component";
import {PageHeaderComponent} from "../page-header/page-header.component";
import {PaperDirective} from "../../../../../directives/paper.directive";

@Component({
  selector: 'app-paper',
  standalone: true,
  imports: [
    LetterHeadComponent,
    PageHeaderComponent,
    PaperDirective
  ],
  templateUrl: './paper.component.html',
  styleUrl: './paper.component.css'
})
export class PaperComponent implements AfterViewInit{

  @Input() portrait:boolean = true

  @ViewChild('PaperContainer') paperContainer: ElementRef

  constructor(
    private cdr:ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    // this.isOverflow()
    this.cdr.detectChanges()
  }


  isOverflow():boolean {
    const container = this.paperContainer.nativeElement
    return container.scrollHeight>container.clientHeight
  }



}
