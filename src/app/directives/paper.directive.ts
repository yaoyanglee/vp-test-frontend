import {
  AfterViewInit,
  ContentChildren,
  Directive,
  ElementRef,
  Host,
  Optional,
  QueryList,
  SkipSelf
} from '@angular/core';

@Directive({
  selector: '[appPaper]',
  standalone: true
})
export class PaperDirective implements AfterViewInit {

  private children: PaperDirective[] = [];

  constructor(
    @Optional() @SkipSelf() private parent: PaperDirective,
    private elementRef: ElementRef
  ) {
    // If there's a parent, register this directive as a child
    console.log(parent)
    parent?.registerChild(this);
  }

  ngAfterViewInit() {
    // If you need to manipulate or access children, do it here
  }

  ngOnDestroy() {
    this.parent?.unregisterChild(this);
  }

  registerChild(child: PaperDirective) {
    this.children.push(child);
  }

  unregisterChild(child: PaperDirective) {
    const index = this.children.indexOf(child);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }

  getChildren(): PaperDirective[] {
    return this.children;
  }

  getElementRef(): HTMLElement{
    return this.elementRef.nativeElement
  }


  // Optionally, add a method to recursively collect all descendants
  getAllDescendants(): PaperDirective[] {

    // Return [self] if this element is the leaf node
    if(!this.children.length){
      // console.log(this.getElementRef())
      return [this]
    }


    // Return all leaves from current node
    let descendants = [];
    this.children.forEach(child => {
      descendants.push(...child.getAllDescendants());
    });
    return descendants;
  }
}
