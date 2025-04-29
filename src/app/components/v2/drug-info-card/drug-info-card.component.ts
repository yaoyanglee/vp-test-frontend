import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {FormExtractorService} from "../../../services/v2/formExtractor/form-extractor.service";
import {LabelFieldComponent} from "./label-field/label-field.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-drug-info-card',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzIconDirective,
    NzDividerComponent,
    LabelFieldComponent,
    CommonModule
  ],
  templateUrl: './drug-info-card.component.html',
  styleUrl: './drug-info-card.component.css'
})
export class DrugInfoCardComponent implements OnInit{

  @Input() DrugInfoFormControl!:FormGroup<any>
  @Input() drug_name: TemplateRef<any>
  @Input() information: TemplateRef<any>
  @Input() pillbox: TemplateRef<any>

  isExpand:boolean = false

  constructor(
    protected formExtractor: FormExtractorService
  ) {
  }


  ngOnInit() {
    // console.log(this.DrugInfoFormControl)
  }

  toggleExpand(){
    this.isExpand = !this.isExpand
  }

  formGetArray(name: string, formGroup?: AbstractControl<any>):FormArray{
    return formGroup.get(name) as FormArray
  }

  getFormGroup(group: any): FormGroup{
    return group as FormGroup
  }

  getFormControl(control: AbstractControl): FormControl {
    return control as FormControl;
  }


}
