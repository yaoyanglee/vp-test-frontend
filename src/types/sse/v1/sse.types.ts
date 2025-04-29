import moment, {Moment} from "moment";


export type SSE = {
  patientId: string,
  message: string,
  time: string|Moment
}
