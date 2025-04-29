import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Patient, PatientDataState, PatientSource} from "../../../../types/v2/patient.types";
import moment from "moment";
import {PatientData} from "../../../../types/summary/summary.types";
import axios from "axios";
import {environment} from "../../../../environments/environment";
import {MedicineUom} from "../../../../types/v2/medicine.types";
import {DataCacheService} from "../data-cache/data-cache.service";
import {PatientRaw} from "../../../../types/v2/patient_raw.types";

@Injectable({
  providedIn: 'root'
})
export class PatientDataService implements OnDestroy{

  private readonly LOCALSTORAGE_KEY = "PATIENT_DATA"

  // This is protected cause private was throwing a linting hint on making it read only
  protected patientDataArr: Patient[] = []
  private patientData = new Subject<Patient[]>()

  patientRawData:PatientRaw[]

  private selectedLanguage: string = ''; // Add this property to store the selected language

  // Method to set the selected language
  setLanguage(language: string) {
    this.selectedLanguage = language;
  }

  /**
   * CONSTRUCTOR
   */
  constructor(
    private cache: DataCacheService
  ) {

    // Initialize from local storage
    this.patientDataArr = this.deserialize(window.localStorage.getItem(this.LOCALSTORAGE_KEY)||"")

    // Set up updater to local storage
    this.patientData.subscribe({
      next: val => {
        this.writeToLocalStorage(val)
      }
    })

    // Push data from storage into subject for observers to be updated
    this.patientData.next(this.patientDataArr)

    // Subscribe to changes to local storage and make updates to subject and states
    addEventListener('storage', (e)=>{this.localStorageCallback(e)})

    // Restart API call for states that are loading
    this.fetchLoadingData()

    // Calls raw data from backend
    this.fetchPatientDataRows().then(res => {
      this.patientRawData = res
    })
  }

  /**
   * Destructor to remove event listeners
   */
  ngOnDestroy() {
    removeEventListener('storage', (e)=>{this.localStorageCallback(e)})
  }

  /*************************/
  // PRIVATE METHODS
  /*************************/


  /**
   * Method to convert JSON into string for storage into local storage
   * @param data
   * @return {string}
   * @private
   */
  private serialize(data:Patient[]):string {
    return JSON.stringify(data)
  }

  /**
   * Method to convert string into JSON of type Patient[]
   * @param data
   * @return {Patient[]}
   * @private
   */
  private deserialize(data:string):Patient[] {
    return JSON.parse(window.localStorage.getItem(this.LOCALSTORAGE_KEY) || "[]") as Patient[]
  }

  /**
   * Method to populate states with local storage
   * @private
   */
  private loadFromLocalStorage(){
    // Initialize from local storage
    this.patientDataArr = this.deserialize(window.localStorage.getItem(this.LOCALSTORAGE_KEY)||"")

    // Push data from storage into subject for observers to be updated
    this.patientData.next(this.patientDataArr)
  }

  /**
   * Method to persis the current state into local storage
   * @param data
   * @private
   */
  private writeToLocalStorage(data: Patient[]) {
    window.localStorage.setItem(this.LOCALSTORAGE_KEY, this.serialize(data))
  }

  /**
   * Method called when changes to local storage
   * @private
   */
  private localStorageCallback(event:StorageEvent){
    if(event.key === this.LOCALSTORAGE_KEY){
      console.log(event)
      this.loadFromLocalStorage()
    }
  }

  /**
   * Method to call states that are currently loading.
   * Critical when loading from local storage after a page refresh.
   * @private
   */
  private fetchLoadingData(){
    this.patientDataArr.filter(data => data.status===PatientDataState.LOADING).forEach(patient => {

      switch (patient.source){
        case PatientSource.Identifier:
          setTimeout(async ()=>{
            const res = await this.fetchPatientData(patient.id)
            this.upsert(res)
          }, Math.floor(Math.random()*5000));
          break;
        default:
          let _temp = patient
          _temp.status = PatientDataState.ERROR
          this.upsert(_temp)
      }


      if(patient.source===PatientSource.Identifier){
        setTimeout(async ()=>{
          const res = await this.fetchPatientData(patient.id)
          this.upsert(res)
        }, Math.floor(Math.random()*5000)) // Random time [0, 5) seconds 'retry policy'
      } else {
        patient.status = PatientDataState.ERROR
        this.upsert(patient)
      }
    })
  }

  /*************************/
  // API CALLS
  /*************************/

  /**
   * Method to get summary for patient ID
   * @param patientId
   * @private
   */
  private async getSummary(patientId:string): Promise<PatientData>{
    //const res = await axios.get<PatientData>(`${environment.BACKEND2}/api/v3/get-patient-info/${patientId}`)
    const res = await axios.get<PatientData>(`${environment.BACKEND2}/api/v3/get-patient-info/${patientId}`, {
      params: {
        language: this.selectedLanguage
      }
    });
    return res.data
  }

  /**
   * Method to fetch data from endpoint
   * @param id
   * @return {Promise<Patient>}
   * @private
   */
  private async fetchPatientData(id:string): Promise<Patient> {

    const [summary] = await Promise.all([
      this.getSummary(id)
    ])

    try {
      const _temp:Patient = {
        id: id,
        source: PatientSource.Identifier,
        status: PatientDataState.READY,
        startTime: moment(),
        summary: summary
      }

      return this.preProcessPatientData(_temp)
    } catch (e) {
      console.error(e)
      return {
        id: id,
        source: PatientSource.Identifier,
        status: PatientDataState.ERROR,
        startTime: moment()
      }
    }
  }


  /**
   * Method to upload images and get pillbox + summary
   * @param patientId
   * @param images
   * @private
   */
  private async fetchPatientDataFromImages(patientId:string, images:File[]): Promise<Patient>{

    const formData = new FormData()

    formData.append('patientId', patientId)

    images.forEach((image, index) => {
      formData.append('images', image, image.name)
    })

    //const res = await axios.post(`${environment.BACKEND2}/api/v3/from-image/${patientId}`, formData)
    const res = await axios.post(`${environment.BACKEND2}/api/v3/from-image/${patientId}`, formData, {
      params: {
        language: this.selectedLanguage
      }
    });
    
    try {
      console.log(res)

      return this.preProcessPatientData({
        id: patientId,
        source: PatientSource.Image,
        status: PatientDataState.READY,
        startTime: moment(),
        summary: res.data
      })

    } catch (e) {
      console.error(e)
      return {
        id: patientId,
        source: PatientSource.Image,
        status: PatientDataState.ERROR,
        startTime: moment(),
      }
    }

  }

  /**
   * Method to preprocess data to fit frontend schema and sort out string enums
   * @param data {Patient}
   * @private
   */
  private preProcessPatientData(data:Patient):Patient{

    data.summary.info = data.summary.info.map(drugInfo => {

      const raw_uom = drugInfo.uom

      drugInfo["content/uom"] = drugInfo["content/uom"] ? drugInfo["content/uom"].split('/')[0] : "-"

      drugInfo.uom = drugInfo.uom? drugInfo.uom.charAt(0).toUpperCase() + drugInfo.uom.slice(1) as MedicineUom : MedicineUom.TABLET
      drugInfo.frequency = drugInfo.frequency || "-"
      drugInfo.dosage = `${drugInfo.dosage}${drugInfo.dosage.length>3?'':` ${raw_uom}`}` || "-"
      drugInfo.condition = drugInfo['conditions'] || drugInfo['condition'] || "-"
      drugInfo.instruction = drugInfo.instruction || "-"
      drugInfo.frequency = drugInfo.frequency || "-"

      return drugInfo
    })


    return data
  }


  /*************************/
  // DATA METHODS
  // Mainly for client use
  /*************************/

  /**
   * Method to return an observable of patients
   * @return {Observable<Patient[]>}
   */
  watch(): Observable<Patient[]> {
    return this.patientData.asObservable()
  }


  /**
   * Method to get the current given state of the patient queue
   * @return {Patient[]}
   */
  getCurrentStatic(): Patient[] {
    return this.patientDataArr
  }

  getPatientById(patientID:string){
    const curIndex = this.patientDataArr.findIndex(d => d.id === patientID)

    if(curIndex<0){
      throw `Patient with ID: ${patientID} is not stored in localStorage!`
    }

    return this.patientDataArr[curIndex]
  }


  /**
   * Method to update or assert (create) a new record into the queue
   * @param patient {Patient}
   */
  upsert(patient:Patient):void {
    const curIndex = this.patientDataArr.findIndex(d => d.id === patient.id)

    if(curIndex>=0){
      patient.startTime = this.patientDataArr[curIndex].startTime
      this.patientDataArr[curIndex] = patient
    } else {
      this.patientDataArr.push(patient)
    }

    this.patientData.next(this.patientDataArr)
  }

  upsertDataById(patientId:string, data:PatientData){

    const patientSource = this.patientDataArr.filter(patient => patient.id===patientId)[0].source

    this.upsert({
      id: patientId,
      source: patientSource,
      startTime: moment(),
      status: PatientDataState.READY,
      summary: data
    })
  }


  /**
   * Method to add in patient ID to queue.
   * @param patientId
   * @param source
   * @throws Error when trying to add patient to queue when patient is already in queue
   */
  addToQueue(patientId:string, source:PatientSource = PatientSource.Identifier):void {

    if (this.patientDataArr.findIndex(d => d.id === patientId) >= 0){
      throw "Patient already in queue!"
    }

    // Cache raw data
    this.cache.addToCache(patientId, this.patientRawData.filter(r => r.patient_id===patientId), [])

    // Add to queue first
    this.upsert({
      id: patientId,
      source: source,
      startTime: moment(),
      status: PatientDataState.LOADING
    })

    // Update values
    this.fetchPatientData(patientId)
      .then(r=>{
        this.upsert(this.preProcessPatientData(r))
      })
      .catch(console.error)
  }


  /**
   * Method to add to queue from images
   * @param patientId
   * @param images
   */
  addImageToQueue(patientId:string, images:File[]):void{

    if (this.patientDataArr.findIndex(d => d.id === patientId) >= 0){
      throw "Patient already in queue!"
    }

    // Cache images
    this.cache.addImageEntryToCache(patientId, images)


    // Create loading state
    this.upsert({
      id: patientId,
      source: PatientSource.Image,
      startTime: moment(),
      status: PatientDataState.LOADING
    })

    // Fetch data then update
    this.fetchPatientDataFromImages(patientId, images)
      .then(r => {
        console.log(r)
        this.upsert(r)
      })
      .catch(console.error)

    }

  /**
   * Method to reload the content from backend
   * @param patientId
   */
  refresh(patientId:string){
    this.upsert({
      id:patientId,
      source: PatientSource.Identifier, // ONLY ID patients can be refreshed!
      startTime: moment(),
      status: PatientDataState.LOADING
    })

    this.fetchPatientData(patientId)
      .then(r => this.upsert(r))
      .catch(console.error)

  }

  /**
   * Method to delete patient in queue based on id
   * @param patientId
   */
  delete(patientId:string){
    this.patientDataArr = this.patientDataArr.filter(patient => patient.id!==patientId)
    this.patientData.next(this.patientDataArr)

    this.cache.deleteFromCache(patientId)
  }


  async fetchPatientDataRows():Promise<PatientRaw[]>{
    const res = await axios.get<{data:PatientRaw[]}>(`${environment.BACKEND2}/api/v3/get-raw`)
    return res.data.data
  }

}
