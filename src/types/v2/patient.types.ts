import {Moment} from "moment";
import {PatientData} from "../summary/summary.types";


export enum PatientDataState {
  LOADING = "loading",
  ERROR = "error",
  READY = "ready"
}

export enum PatientSource {
  Identifier = "IDENTIFIER",
  Image = "IMAGE"
}

export type Patient = {
  id: string,
  startTime: Moment,
  source: PatientSource
  status: PatientDataState,
  summary?: PatientData // TODO change name
  [key:string]:any
}
