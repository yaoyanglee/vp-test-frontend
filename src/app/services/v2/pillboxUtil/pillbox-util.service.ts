import {Injectable, OnDestroy} from '@angular/core';
import {DrugInfoSchedule} from "../../../../types/summary/summary.types";
import {PillboxIconMode} from "../../../../types/pillbox/PillboxIconMode.types";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PillboxUtilService implements OnDestroy{

  $viewMode: BehaviorSubject<PillboxIconMode>
  private readonly LOCALSTORAGE_KEY:string = "PILLBOX_MODE_STORE"



  constructor() {

    this.$viewMode = new BehaviorSubject<PillboxIconMode>(this.initViewMode())

    // set up subscription to post value to local storage
    this.$viewMode.subscribe(val => {
      // console.log("DEBUG! ", val)
      window.localStorage.setItem(this.LOCALSTORAGE_KEY, val)
    })

  }

  private initViewMode():PillboxIconMode {

    // Check for local storage
    let stored = window.localStorage.getItem(this.LOCALSTORAGE_KEY)

    if(!stored === null || !Object.values(PillboxIconMode).includes(stored as PillboxIconMode)){ // initialize local storage if not set OR not set properly
      window.localStorage.setItem(this.LOCALSTORAGE_KEY, PillboxIconMode.ICON_DEFAULT)
      stored = PillboxIconMode.ICON_DEFAULT
    }

    addEventListener('storage', this.storageListenerForPillboxMode)

    // this.$viewMode.next(stored as PillboxIconMode)
    return stored as PillboxIconMode
  }

  ngOnDestroy(){
    removeEventListener('storage', this.storageListenerForPillboxMode)
  }

  private storageListenerForPillboxMode(e: StorageEvent){
    if(e.key === this.LOCALSTORAGE_KEY){
      this.$viewMode.next(window.localStorage.getItem(this.LOCALSTORAGE_KEY) as PillboxIconMode || PillboxIconMode.ICON_DEFAULT)
    }
  }

  getCurrentViewMode():PillboxIconMode{
    return this.$viewMode.value
  }

  tileSchedule(baseSchedule:DrugInfoSchedule[], length:number=7): DrugInfoSchedule[]{

    // Case where length of base schedule > desired length
    if(baseSchedule.length>=length){
      return baseSchedule.slice(0, length)
    }

    // Case where we have to tile the baseSchedule to get desired length
    const timesToRepeat:number = Math.ceil(length/baseSchedule.length) // Get number of times to tile
    // Get only desired length
    return Array.from({length: timesToRepeat}, () => baseSchedule)
      .flat() // Flatten array
      .slice(0, length)
  }


}
