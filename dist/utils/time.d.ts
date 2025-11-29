import { DateString } from "../types";
declare const tN: () => number, monNm: string[], dayRes = 90, // number of points in one day
/** One Second */
oneSec = 1000, 
/** One Minute */
oneMin = 60000, 
/** One Hour */
oneHr = 3600000, 
/** One Day (24 hours) */
oneDay = 86400000, 
/** One Month (31.25 days) */
oneMon = 2700000000, 
/** add zero to date elements */
addZ: (n: string | number) => string, tmUTC: (time: string | number | Date) => string, tmAP: (time: string | number | Date) => string, shortDt: (time: string | number | Date) => string, moYrDt: (time: string | number | Date) => string, fullDt: (time: string | number | Date) => string, fullDate: (time: string | number | Date) => string, fullLong: (time: string | number | Date) => string, 
/** This Year '2025' */
thisYear: (e?: number | string) => number, 
/** Date Standard 2022-06-23 */
dateStandard: (d: string | number | Date) => DateString, 
/** Time Standard 16:36:14 */
timeStandard: (dt: Date) => string, 
/**  SEO date: '2022-06-23T16:36:14+01:00' */
seoDt: (t?: number | string | Date) => string, 
/** invoice #22 06 23 109 */
invDt: (t: string | number | Date) => string;
export { oneSec, oneDay, oneHr, oneMin, oneMon, thisYear, seoDt, dateStandard, timeStandard, dayRes, invDt, fullDt, fullDate, fullLong, shortDt, moYrDt, tmAP, tmUTC, monNm, tN, addZ, };
