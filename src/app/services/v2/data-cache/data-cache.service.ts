import {Injectable, OnDestroy} from '@angular/core';
import {PatientCache, PatientImageCache} from "../../../../types/v2/cache.types";
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {PatientRaw} from "../../../../types/v2/patient_raw.types";
import {NgxIndexedDBService} from "ngx-indexed-db";
import {CacheStoreCollection} from "../../../app.indexed-db.config";

@Injectable({
  providedIn: 'root'
})
export class DataCacheService {


  constructor(
    private indexedDb: NgxIndexedDBService
  ) {
  }

  private blobToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        const base64data = reader.result as string
        resolve(base64data)
      }
      reader.onerror = (error) => {
        reject(error)
      }
    })
  }

  addToCache(patientId:string, rows:PatientRaw[]=[], images:PatientImageCache[]=[]):void{
    this.indexedDb.add(CacheStoreCollection, {
      patientId: patientId,
      rows: rows,
      images: images
    }).subscribe(console.log)
  }

  addImageEntryToCache(patientId:string, images:File[]):void{
    const innerFunction = async () => {
      const safeUrls:PatientImageCache[] = []
      for (const image of images) {
        safeUrls.push({
          filename: image.name,
          url: await this.blobToBase64(image)
        })
      }
      return safeUrls
    }
    innerFunction().then(res => this.addToCache(patientId, [], res))

  }

  deleteFromCache(patientId:string):void{
    firstValueFrom<any>(this.indexedDb.deleteByKey(CacheStoreCollection, patientId))
      .then(r => console.log(`Delete ${patientId} cache: ${r}`))
      .catch(console.error)
  }

  async getPatientCache(patientId:string):Promise<PatientCache | undefined>{
    const selected = await firstValueFrom<PatientCache>(this.indexedDb.getByIndex(CacheStoreCollection, "patientId", patientId))
    return selected || undefined
  }

}
