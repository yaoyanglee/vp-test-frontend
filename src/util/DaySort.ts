/**
 * Function to sort keys according to the day of the week.
 * This function is used in `Array.prototype.sort(DaySort)` to sort keys of an array.
 * Items that are not in FIXED_ORDER are sent to the back of the arr
 */
export default function DaySort(a:string, b:string):number {

  const FIXED_ORDER:string[] = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY"
  ]

  // If A not in FIXED_ORDER, send to back
  if(FIXED_ORDER.indexOf(a.toUpperCase()) < 0){
    return 1
  }

  // If B not in FIXED_ORDER, retain order
  if(FIXED_ORDER.indexOf(b.toUpperCase()) < 0){
    return -1
  }

  return FIXED_ORDER.indexOf(a.toUpperCase()) - FIXED_ORDER.indexOf(b.toUpperCase())


}
