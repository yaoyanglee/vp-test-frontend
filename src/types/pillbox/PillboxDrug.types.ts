import {PillboxDrugUOM} from "./PillboxDrugUOM.types";


export type PillboxDrug = {
  Drug:string,
  Dose:string,
  Note:string,
  UOM:PillboxDrugUOM,
  "Meal preference":string,
}
