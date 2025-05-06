import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit, QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SectionAccordionComponent } from './section-accordian/section-accordion.component';
import { SecondarySectionAccordianComponent } from './secondary-section-accordian/secondary-section-accordian.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import {ActivatedRoute, Router} from "@angular/router";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {LabelTextComponent} from "../../components/v2/label-text/label-text.component";
import {Patient} from "../../../types/v2/patient.types";
import {PatientDataService} from "../../services/v2/patient/patient-data.service";
import {TableWrapperComponent} from "../../components/v2/table-wrapper/table-wrapper.component";
import {NgForOf} from "@angular/common";
import {
  AbstractControl,
  AbstractFormGroupDirective,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from "@angular/forms";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {DrugInfoSchedule} from "../../../types/summary/summary.types";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {DrugInfoCardComponent} from "../../components/v2/drug-info-card/drug-info-card.component";
import {LabelFieldComponent} from "../../components/v2/drug-info-card/label-field/label-field.component";
import {PillboxFieldComponent} from "../../components/v2/drug-info-card/pillbox-field/pillbox-field.component";
import {FormExtractorService} from "../../services/v2/formExtractor/form-extractor.service";
import {
  ConvertFormToPatientDataService
} from "../../services/v2/convertFormToPatientData/convert-form-to-patient-data.service";
import {NzModalComponent, NzModalContentDirective, NzModalService} from "ng-zorro-antd/modal";
import {VerifyModalComponent} from "../../components/v2/verify-modal/verify-modal.component";
import {MedicineUom} from "../../../types/v2/medicine.types";
import {SourceButtonComponent} from "../../components/v2/source-button/source-button.component";


@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    NzSelectModule,
    SectionAccordionComponent,
    SecondarySectionAccordianComponent,
    NzTableModule,
    NzPageHeaderModule,
    NzButtonComponent,
    LabelTextComponent,
    TableWrapperComponent,
    NgForOf,
    ReactiveFormsModule,
    CdkTextareaAutosize,
    NzIconDirective,
    DrugInfoCardComponent,
    LabelFieldComponent,
    PillboxFieldComponent,
    NzModalComponent,
    NzModalContentDirective,
    VerifyModalComponent,
    SourceButtonComponent,
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit, AfterViewInit{

  patientID:string = ""
  data: Patient

  dataForm: FormGroup

  @ViewChildren(DrugInfoCardComponent) drugInfoCards: QueryList<DrugInfoCardComponent>

  @ViewChild(VerifyModalComponent) previewModal:VerifyModalComponent



  constructor(
    private activatedRoute:ActivatedRoute,
    private patientDataService:PatientDataService,
    private fb: FormBuilder,
    private converter: ConvertFormToPatientDataService,
    protected formExtractor: FormExtractorService,
  ){
    this.patientID = this.activatedRoute.snapshot.paramMap.get('id') || ""
    this.data = this.patientDataService.getPatientById(this.patientID)
    this.dataForm = this.fb.group({
      summary: this.fb.array([]),
      info: this.fb.array([])
    })
  }

  ngOnInit() {
    this.summaryFormGroups().forEach(drug=>this.formGetArray('summary').push(drug))
    this.infoFormGroups().forEach(drug => this.formGetArray('info').push(drug))

    // Subscribe to changes to save data to localStorage
    this.dataForm.valueChanges.subscribe(val => {
      console.log(val)
      this.saveData()
    })
  }

  ngAfterViewInit() {
    // DEBUGGING MODAL
    // this.previewModal.openModal(this.data.id)
  }

  private infoFormGroups():FormGroup[]{
    if(!this.data.summary?.info){
      return []
    }

    const drugInfoSchedule = (schedule:DrugInfoSchedule[]) => {
      return schedule.map(sch => this.fb.group({
        morning: sch.morning,
        afternoon: sch.afternoon,
        evening: sch.evening
      }))
    }

    return this.data.summary.info.map(drugInfo => this.fb.group({
      drug_name: drugInfo.drug_name,
      uom: drugInfo.uom,
      frequency: drugInfo.frequency || '-',
      dosage: drugInfo.dosage || "-",
      condition: drugInfo.condition || "-",
      instruction: drugInfo.instruction || '-',
      content_uom: drugInfo["content/uom"].split('/')[0],
      schedule: this.fb.array(drugInfoSchedule(drugInfo.schedule))
    }))
  }

  private summaryFormGroups():FormGroup[] {

    if(!this.data.summary?.results){
      return []
    }

    return this.data.summary.results.map(drug => this.fb.group({
      drug_name: drug.drug_name,
      administration: drug.Administration,
      common_side_effects: drug["Common side effects"],
      conditions: drug.Conditions,
      storage: drug.Storage
    }))
  }

  formGetArray(name: string, formGroup?: AbstractControl<any>):FormArray{
    if(!formGroup){
      return this.dataForm.get(name) as FormArray
    }

    return formGroup.get(name) as FormArray
  }

  getFormGroup(group: any): FormGroup{
    return group as FormGroup
  }

  getFormControl(control: AbstractControl): FormControl {
    return control as FormControl;
  }

  /**
   * Method to get the formatted string for Drugs sections
   */
  getDrugsSubtitle():string{

    if (this.data.summary?.results) {
      if (this.data.summary.results.length === 1) {
        return "1 drug"
      } else {
        return `${this.data.summary.results.length} drugs`
      }
    }
    return "No drugs found"
  }


  saveData(){
    // console.log(this.dataForm)
    // console.log(this.formExtractor.extractValues<any>(this.dataForm))
    // console.log(this.converter.fromForm(this.formExtractor.extractValues<any>(this.dataForm)))

    this.patientDataService.upsertDataById(this.patientID, this.converter.fromForm(this.formExtractor.extractValues<any>(this.dataForm)))
  }


  anyDrugCardOpen():boolean {
    if(!this.drugInfoCards){
      return false
    }

    return this.drugInfoCards
      .map(card => card.isExpand)
      .filter(bool => bool)
      .length > 0

  }

  getCollapseText():string | void{

    if(!this.drugInfoCards){
      return
    }

    return this.anyDrugCardOpen()?'Collapse all':'Expand all'

  }

  collapseOrExpandAllDrugCards(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    if(this.anyDrugCardOpen()){
      this.drugInfoCards.forEach(card => {
        card.isExpand=false
      })
    } else {
      this.drugInfoCards.forEach(card => {
        card.isExpand=true
      })
    }
  }

  previewPatient(){
    this.previewModal.openModal(this.data.id)
  }


  // This is needed to access the keys of objects from the front end
  protected readonly Object = Object;
  protected readonly FormControl = FormControl;
  protected readonly FormGroup = FormGroup;
  protected readonly MedicineUom = MedicineUom;
}
