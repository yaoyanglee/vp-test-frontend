import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked, AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren, ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {PatientDataService} from "../../../services/v2/patient/patient-data.service";
import {Patient} from "../../../../types/v2/patient.types";
import {NzModalComponent, NzModalContentDirective, NzModalService} from "ng-zorro-antd/modal";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {InformationPageComponent} from "../print/pages/information-page/information-page.component";
import {PaperComponent} from "../print/components/paper/paper.component";
import {PillboxPageComponent} from "../print/pages/pillbox-page/pillbox-page.component";
import {SummaryPageComponent} from "../print/pages/summary-page/summary-page.component";
import {PaperDirective} from "../../../directives/paper.directive";
import {PaperContainerDirective} from "../../../directives/paper-container.directive";
import JsPdf from "jspdf";
import html2canvas from "html2canvas";
import moment from "moment";
import {ActivatedRoute, Router} from "@angular/router";
import {NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzOptionComponent, NzOptionGroupComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {PillboxIconMode} from "../../../../types/pillbox/PillboxIconMode.types";
import {PillboxUtilService} from "../../../services/v2/pillboxUtil/pillbox-util.service";
import {FormsModule} from "@angular/forms";
import {SourceButtonComponent} from "../source-button/source-button.component";
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-verify-modal',
  standalone: true,
  imports: [
    NzModalComponent,
    NzModalContentDirective,
    NzButtonComponent,
    InformationPageComponent,
    PaperComponent,
    PillboxPageComponent,
    SummaryPageComponent,
    PaperDirective,
    PaperContainerDirective,
    NzInputGroupComponent,
    NzSelectComponent,
    NzOptionGroupComponent,
    NzOptionComponent,
    FormsModule,
    SourceButtonComponent
  ],
  templateUrl: './verify-modal.component.html',
  styleUrl: './verify-modal.component.css'
})
export class VerifyModalComponent implements OnInit, AfterViewInit, AfterContentInit{

  patient: Patient
  modalIsVisible: boolean = false

  zoomLevel: number = 100;

  pillboxIconMode: PillboxIconMode

  isLoading: boolean = false
  isPrintLoading: boolean = false

  pdfDoc?: JsPdf
  pdfIFrame?: HTMLIFrameElement

  pageElements:HTMLElement[]

  @ViewChildren(PaperDirective) pages: QueryList<PaperDirective>

  constructor(
    private patientDataService: PatientDataService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private pillboxService: PillboxUtilService,
    modalService: NzModalService,
    private renderer: Renderer2
  ) {

    this.pillboxService.$viewMode.subscribe(val => {
      console.log(val)
      this.pillboxIconMode = val
    })

  }

  ngOnInit() {
    this.zoomLevel = 100;
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngAfterContentInit() {
    console.log("Checked!")
  }

  openModal(patientId:string){
    this.patient = this.patientDataService.getPatientById(patientId)
    this.modalIsVisible = true
    this.cdr.detectChanges()
    // setTimeout(()=>{this.init_pdf()}, 100)
  }

  closeModal(){
    console.log("closing!")
    this.modalIsVisible = false
    this.pdfDoc = undefined
    document.body.removeChild(this.pdfIFrame)
    this.cdr.detectChanges()
    this.zoomLevel = 100;
    this.applyZoom(this.zoomLevel / 100);
  }

  pillboxModeOnChange(e:PillboxIconMode){
    this.pillboxIconMode = e
    this.pillboxService.$viewMode.next(e)
    // setTimeout(()=>{this.init_pdf()}, 100)
    this.pdfDoc = undefined
  }

  zoomIn(): void {
    this.zoomLevel += 5;
    this.applyZoom(this.zoomLevel / 100);
  }
  
  // zoomOut(): void {
  //   this.zoomLevel -= 10;
  //   if (this.zoomLevel < 50) this.zoomLevel = 50; // Minimum zoom level
  //   this.applyZoom(this.zoomLevel / 100);
  // }
  zoomOut(): void {
    if (this.zoomLevel > 100) {
      this.zoomLevel -= 5;
      this.applyZoom(this.zoomLevel / 100);
    }
  }
  
  applyZoom(scale: number): void {
    const body = document.body;
    this.renderer.setStyle(body, 'transform', `scale(${scale})`);
    this.renderer.setStyle(body, 'transform-origin', 'top left');
  }

  edit(){
    if (this.router.url===`/demo/v2/patient/${this.patient.id}`){
      this.modalIsVisible=false
    } else {
      this.router.navigateByUrl(`/demo/v2/patient/${this.patient.id}`).catch(console.error)
    }
  }

  private init_pdf_print(){
    // console.warn("LOADING INIT PDF")


    this.createPdf()
      .then(doc => {
        this.pdfDoc = doc
        this.pdfIFrame = document.createElement("iframe")
        this.pdfIFrame.style.display = "none"
        this.pdfIFrame.src = URL.createObjectURL(doc.output("blob"))
        document.body.append(this.pdfIFrame)
        this.pdfIFrame.onload = () => {
          // this.isPrintLoading = false
          this.pdfIFrame.contentWindow.print()
        }
      })
      .finally(()=> {
        // this.isLoading = false
      })
  }


  private async createPdf(): Promise<JsPdf>{

    if(!this.pdfDoc){
      // this.isLoading = true
      // this.isPrintLoading = true
      this.pageElements = this.pages.map(page=>page.getAllDescendants())
        // Combine the pages into a 1d array
        .reduce((acc:HTMLElement[], page)=>{
          page.forEach(pieceOfPaperHTML => {acc.push(pieceOfPaperHTML.getElementRef())})
          return acc
        }, [])

      let doc = new JsPdf('p', 'mm', [342, 180])

      for (const page of this.pageElements) {
        console.log("Generating: ", page)

        await html2canvas(page, {scale: 1.5, }).then(canvas => {
          doc.addPage([342, 180], page.clientHeight>page.clientWidth?'p':'l')

          const printWidth = page.clientHeight > page.clientWidth ? 170 : 342
          const printHeight = page.clientHeight > page.clientWidth ? 342 : 180

          doc.addImage(canvas.toDataURL("image/png"),
            "PNG",
            0,
            0,
            printWidth,
            printHeight)
        })
      }

      doc.deletePage(1)
      this.pdfDoc = doc

      return doc
    } else {
      return this.pdfDoc
    }

  }


  download(){
    this.isLoading = true
    this.createPdf()
      .then(doc => {
        doc.save(`${this.patient.id}_${moment().format('yyyy-MM-DD_HH-mm')}.pdf`)
      })
      .finally(()=>{this.isLoading=false})
    // this.pdfDoc.save(`${this.patient.id}_${moment().format('yyyy-MM-DD_HH-mm')}.pdf`)
  }

  print(){
    // this.pdfIFrame.contentWindow.print()
    // printJS()
    this.isPrintLoading = true
    this.init_pdf_print()
    this.isPrintLoading = false
  }




  protected readonly PillboxIconMode = PillboxIconMode;
}
