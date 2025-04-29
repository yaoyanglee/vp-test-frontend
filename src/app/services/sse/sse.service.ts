import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {SSE} from "../../../types/sse/v1/sse.types";
import moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class SseService {

  $update: EventEmitter<SSE> = new EventEmitter<SSE>()

  constructor() {
    // if(environment.PRODUCTION===false){
    //   const sseSource = new EventSource(`${environment.BACKEND2}/sse/v1`)
    //   sseSource.onmessage = event => {
    //     const data: string[] = event.data.split("|||")
    //     this.$update.next({
    //       patientId: data[0],
    //       message: data[1],
    //       time: moment()
    //     })
    //   }
    //
    //   this.$update.asObservable().subscribe(val=>console.log(val))
    // }
  }

  getUpdateObservable(): Observable<SSE> {
    return this.$update.asObservable()
  }




}
