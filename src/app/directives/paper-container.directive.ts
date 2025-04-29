import {Directive, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {PaperDirective} from "./paper.directive";

@Directive({
  selector: '[appPaperContainer]',
  standalone: true
})
export class PaperContainerDirective {

  // @ViewChildren(PaperContainerDirective) paperContainers: QueryList<PaperContainerDirective>
  @ViewChildren(PaperDirective) pages: QueryList<PaperDirective>

  constructor() { }

  getPages(): QueryList<PaperDirective>{
    console.log(this.pages)
    return this.pages
  }



}
