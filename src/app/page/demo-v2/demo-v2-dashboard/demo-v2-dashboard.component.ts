import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild} from '@angular/core';
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {NzCardComponent, NzCardTabComponent} from "ng-zorro-antd/card";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzTreeComponent} from "ng-zorro-antd/tree";
import {NzCascaderComponent} from "ng-zorro-antd/cascader";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzPopoverDirective} from "ng-zorro-antd/popover";
import {NzModalComponent, NzModalContentDirective} from "ng-zorro-antd/modal";
import {NzTabChangeEvent, NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {NzUploadComponent} from "ng-zorro-antd/upload";
import axios from "axios";
import {environment} from "../../../../environments/environment";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {PatientDataService} from "../../../services/v2/patient/patient-data.service";
import {FormsModule} from "@angular/forms";
import {Patient, PatientDataState, PatientSource} from "../../../../types/v2/patient.types";
import {NzTableComponent, NzTbodyComponent, NzTheadComponent} from "ng-zorro-antd/table";
import {TableWrapperComponent} from "../../../components/v2/table-wrapper/table-wrapper.component";
import moment from "moment";
import {RouterLink} from "@angular/router";
import {NzTagComponent} from "ng-zorro-antd/tag";
import {MomentTimeSinceComponent} from "../../../components/v2/moment-time-since/moment-time-since.component";
import {VerifyModalComponent} from "../../../components/v2/verify-modal/verify-modal.component";
import {NzEmptyComponent} from "ng-zorro-antd/empty";
import {FileChangeEvent} from "@angular/compiler-cli/src/perform_watch";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {PatientidRawComponent} from "../../../components/v2/patientid-raw/patientid-raw.component";
import {PatientRaw} from "../../../../types/v2/patient_raw.types";
import {SourceButtonComponent} from "../../../components/v2/source-button/source-button.component";
import { HttpClient } from '@angular/common/http';

import { LanguageService } from '../../../services/language.service';


@Component({
  selector: 'app-demo-v2-dashboard',
  standalone: true,
  imports: [
    NzTypographyComponent,
    NzCardComponent,
    NzIconDirective,
    NzDividerComponent,
    NzPaginationComponent,
    NzInputGroupComponent,
    NzTreeComponent,
    NzCascaderComponent,
    NzSelectComponent,
    NzButtonComponent,
    NzPopoverDirective,
    NzInputDirective,
    NzModalComponent,
    NzModalContentDirective,
    NzCardTabComponent,
    NzTabComponent,
    NzTabSetComponent,
    NzUploadComponent,
    NzOptionComponent,
    CommonModule,
    FormsModule,
    NzTableComponent,
    NzTheadComponent,
    TableWrapperComponent,
    NzTbodyComponent,
    RouterLink,
    NzTagComponent,
    MomentTimeSinceComponent,
    VerifyModalComponent,
    NzEmptyComponent,
    NgOptimizedImage,
    PatientidRawComponent,
    SourceButtonComponent,
  ],
  templateUrl: './demo-v2-dashboard.component.html',
  styleUrl: './demo-v2-dashboard.component.css'
})
export class DemoV2DashboardComponent implements OnInit{

  @ViewChild(VerifyModalComponent) verifyModal: VerifyModalComponent
  @ViewChild('fileInputField') fileInputField: ElementRef

  currentTabIndex:number = 0

  patientOptions:string[] = []
  addPatientPopupVisible:boolean = false

  patientDataRows:PatientRaw[]

  patientIdSelect:string = ""
  patientIdImage:string = ""

  patientImageUploads:File[] = []

  patientQueue:Patient[] = []

  selectHoverPreview = false

  selectedLanguage: string = ''; // Property to store the selected language

  languages = [
    { value: 'en', label: 'English' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ms', label: 'Malay' },
    { value: 'ta', label: 'Tamil' }
  ];

  /**
   * CONSTRUCTOR
   */
  constructor(
    private patientDataService: PatientDataService,
    private sanitizer: DomSanitizer,
    private languageService: LanguageService,
    private http: HttpClient
  ) {}

  /**
   * NG ON INIT
   */
  ngOnInit() {
    // fetch options for "add patient to queue" dropdown
    this.fetchPatientOptions().catch(console.error)

    this.patientDataService
      .fetchPatientDataRows()
      .then(res=>{this.patientDataRows=res})

    this.patientQueue = this.patientDataService.getCurrentStatic()

    this.patientDataService.watch().subscribe(data => {
      this.patientQueue = data
    })

    this.languageService.currentLanguage.subscribe(language => {
      this.selectedLanguage = language;
    });
  }

  onLanguageChange(selectedLanguage: string) {
    this.selectedLanguage = selectedLanguage;
    console.log('Selected Language:', this.selectedLanguage);

    // Update patient data service with the selected language
    this.patientDataService.setLanguage(this.selectedLanguage);

    // Notify the language service of the change
    this.languageService.changeLanguage(this.selectedLanguage);
  }
  

  /******************************/
  /* Cosmetic live updates
  /******************************/
  patientTimeInQueue(patient:Patient): string {
    return moment(patient.startTime).fromNow()
  }

  closeSelectPreviewOnOpen(e:string|null){
    if(e===null){
      this.selectHoverPreview=false
    }
  }

  canSubmit():boolean {

    switch(this.currentTabIndex){
      case 0:
        return this.patientIdSelect !== "" && this.patientIdSelect!==null;
      case 1:
        return this.patientImageUploads.length>0 && this.patientIdImage!==""
      default:
        return false
    }
  }

  /******************************/
  /* Modal methods
  /******************************/
  openModalForPatient(patientId: string){
    this.verifyModal.openModal(patientId)
  }



  /******************************/
  /* Patient management
  /******************************/

  patientTabChange(event:NzTabChangeEvent){
    console.log(event.index)
    this.currentTabIndex = event.index
  }

  /**
   * ADD PATIENTS
   */
  addPatientToQueue():void {
    switch (this.currentTabIndex) {
      case 0:
        if(this.patientIdSelect){
          this.patientDataService.addToQueue(this.patientIdSelect)
        }
        break;
      case 1:
        console.log(this.patientImageUploads)
        console.log(this.patientIdImage)
        if(this.patientIdImage && this.patientImageUploads.length){
          this.patientDataService.addImageToQueue(this.patientIdImage, this.patientImageUploads)
        }
        break;
    }
  }

  deletePatientFromQueue(patientId:string):void{
    console.log(patientId)
    this.patientDataService.delete(patientId)
  }

  refreshPatientInQueue(patientId:string):void{
    this.patientDataService.refresh(patientId)
  }

  uploadImageClick(){
    console.log("Clicked!")
    this.fileInputField.nativeElement.click()
  }

  onInputChange(event: Event){
    const element = event.target as HTMLInputElement
    this.patientImageUploads.push(...Array.from(element.files)
      .filter(file => file.type==='image/jpeg' || file.type==='image/png')
      .filter(file => !this.patientImageUploads.map(_file=>_file.name).includes(file.name))
    )
  }

  onDragOver(event: DragEvent){
    event.preventDefault()
    event.stopPropagation()
  }

  onDragDrop(event: DragEvent){
    event.preventDefault()
    event.stopPropagation()

    this.patientImageUploads.push(...Array.from(event.dataTransfer.files)
      .filter(file => file.type==='image/jpeg' || file.type==='image/png')
      .filter(file => !this.patientImageUploads.map(_file=>_file.name).includes(file.name))
    )

    console.log(this.patientImageUploads)

  }

  deleteFileWithName(fileName:string){

    this.patientImageUploads = this.patientImageUploads.filter(file => file.name!==fileName)

  }

  getFilteredRows(patientId: string): PatientRaw[] {
    return this.patientDataRows.filter(row => row.patient_id===patientId)
  }

  /**
   * API CALL METHODS
   */
  async fetchPatientOptions(){
    const res = await axios.get<string[]>(`${environment.BACKEND2}/select/all`)
    this.patientOptions = res.data
  }

  openImageInTab(file:File){
    window.open(URL.createObjectURL(file), "_blank")
  }

  getImageUrl(file:File):SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file))
  }


  protected readonly moment = moment;
  protected readonly PatientDataState = PatientDataState;
  protected readonly PatientSource = PatientSource;
}
