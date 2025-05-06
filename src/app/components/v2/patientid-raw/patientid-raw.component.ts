import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PatientRaw} from "../../../../types/v2/patient_raw.types";
import {environment} from "../../../../environments/environment";
import {NzTableComponent, NzTbodyComponent, NzTheadComponent} from "ng-zorro-antd/table";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-patientid-raw',
  standalone: true,
  imports: [
    NzTableComponent,
    NzTbodyComponent,
    NgForOf
  ],
  templateUrl: './patientid-raw.component.html',
  styleUrl: './patientid-raw.component.css'
})
export class PatientidRawComponent implements AfterViewInit, OnDestroy {

  @ViewChild('tableContainer') container: ElementRef

  @Input() rows: PatientRaw[] = []

  limitLeft:boolean = true
  limitRight:boolean = false

  constructor(
  ) {
  }

  ngAfterViewInit() {
    console.log(this.container.nativeElement.scrollWidth)
    this.container.nativeElement.addEventListener("scroll", ()=>{this.userScroll()})
  }

  ngOnDestroy() {
    this.container.nativeElement.removeEventListener("scroll", ()=>{this.userScroll()})
  }

  private scrollPercent(): number {
    const amount_scrollable = this.container.nativeElement.scrollWidth - this.container.nativeElement.clientWidth
    return (this.container.nativeElement.scrollLeft / amount_scrollable)*100
  }

  private userScroll(){
    const scroll_amount = this.scrollPercent()

    if(scroll_amount<5){
      this.limitLeft=true
      this.limitRight=false
    }

    if(scroll_amount>=5 && scroll_amount<=95){
      this.limitLeft=false
      this.limitRight=false
    }

    if(scroll_amount>95){
      this.limitLeft=false
      this.limitRight=true
    }



  }

}
