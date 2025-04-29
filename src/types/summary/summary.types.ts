import {MedicineUom} from "../v2/medicine.types";

export type DrugInfoSchedule = {
  morning: number,
  afternoon: number,
  evening: number
}


export type DrugInfo = {
  drug_name: string,
  uom: MedicineUom,
  "content/uom": string,
  frequency: string,
  dosage: string,
  condition: string,
  instruction: string,
  schedule: DrugInfoSchedule[],
}

export type Result = {
  drug_name: string,
  Conditions: string,
  Administration: string,
  "Common side effects": string,
  Storage: string,
  [key: string]: string
}


export type PatientData = {
  results: Result[],
  info: DrugInfo[],
  raw?:string
}
