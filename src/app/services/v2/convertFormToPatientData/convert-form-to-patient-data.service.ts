import { Injectable } from '@angular/core';
import {PatientData} from "../../../../types/summary/summary.types";

@Injectable({
  providedIn: 'root'
})
export class ConvertFormToPatientDataService {

  constructor() { }

  fromForm(data:any):PatientData{

    return {
      info: data?.info.map((item:any) => {
        return {
          drug_name: item?.drug_name,
          uom: item?.uom,
          "content/uom": item?.content_uom,
          frequency: item?.frequency,
          dosage: item?.dosage,
          instruction: item?.instruction,
          condition: item?.condition,
          schedule: item?.schedule,
        }
      }),
      results: data?.summary.map((item:any) => {
        return {
          drug_name: item?.drug_name,
          Conditions: item?.conditions,
          Administration: item?.administration,
          "Common side effects": item?.common_side_effects,
          Storage: item?.storage
        }
      })
    }

  }
}
