import {PatientRaw} from "./patient_raw.types";
import {SafeUrl} from "@angular/platform-browser";

export type PatientImageCache = {
  filename:string,
  url:string
}

export type PatientCache = {
  patientId:string,
  rows:PatientRaw[],
  images:PatientImageCache[]
}
