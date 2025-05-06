import {PillboxTimeOfDay} from "./PillboxTimeOfDay.types";


type __PillboxWeek = {
  Monday: PillboxTimeOfDay,
  Tuesday: PillboxTimeOfDay,
  Wednesday: PillboxTimeOfDay,
  Thursday: PillboxTimeOfDay,
  Friday: PillboxTimeOfDay,
  Saturday: PillboxTimeOfDay,
  Sunday: PillboxTimeOfDay
}

export type PillboxWeek = __PillboxWeek | undefined
