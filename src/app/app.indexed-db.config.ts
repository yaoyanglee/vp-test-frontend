import {DBConfig} from "ngx-indexed-db";
export const CacheStoreCollection:string = "source"

export const CacheIndexedDbConfig:DBConfig = {
  name: "SourceCache",
  version: 1,
  objectStoresMeta: [{
    store: CacheStoreCollection,
    storeConfig: {keyPath: "patientId", autoIncrement: false},
    storeSchema: [
      {name: "patientId", keypath: "patientId", options: {unique: true}},
      {name: "rows", keypath: "rows", options: {unique: false}},
      {name: "images", keypath: "images", options: {unique: false}},
    ]
  }]
}
