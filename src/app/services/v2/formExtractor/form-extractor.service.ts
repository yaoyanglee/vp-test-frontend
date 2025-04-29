import { Injectable } from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormExtractorService {

  constructor() { }

  formGetArray(formArray: any):FormArray{
    return formArray as  FormArray
  }

  getFormGroup(group: any): FormGroup{
    return group as FormGroup
  }

  getFormControl(control: AbstractControl): FormControl {
    return control as FormControl;
  }

  logger(val:any){
    console.log(val)
  }

  private extractValuesRecursive(val:any):any{

    if(val?.controls?.length){ // if item is a formArray
      return val.controls.map(item => this.extractValuesRecursive(item))
    }

    if(val?.controls){ // if item is a formGroup
      let res:any = {}
      Object.keys(val.controls).forEach(key => {
        res[key] = this.extractValuesRecursive(val.controls[key])
      })
      return res
    }

    return val.value

  }


  extractValues<T>(form: AbstractControl):T{
    return this.extractValuesRecursive(form) as T
  }
}
