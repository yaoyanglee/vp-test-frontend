import {PillboxDrug} from "./PillboxDrug.types";


export type PillboxTimeOfDay = {
  Morning:PillboxDrug[],
  Afternoon:PillboxDrug[],
  Evening:PillboxDrug[],
  [key:string]:PillboxDrug[]
}
