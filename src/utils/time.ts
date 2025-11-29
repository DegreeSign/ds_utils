import { DateString } from "../types";

const
    tN = () => Date.now(),
    monNm = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ],
    moMin = [
        "JAN", "FEB", "MAR", "APR",
        "MAY", "JUN", "JUL", "AUG",
        "SEP", "OCT", "NOV", "DEC"
    ],
    dayS = ["st", "nd", "rd", "th"],
    dayRes = 90, // number of points in one day
    /** One Second */
    oneSec = 1e3,
    /** One Minute */
    oneMin = 6e4,
    /** One Hour */
    oneHr = 36e5,
    /** One Day (24 hours) */
    oneDay = 864e5,
    /** One Month (31.25 days) */
    oneMon = 27e8,
    /** add zero to date elements */
    addZ = (n: string | number) =>
        +n == 0 ? `00`
            : +n < 10 && +n >= 1 ? `0${n}`
                : `${n}`,
    // UTC time: 15:44 UTC
    tmUTC = (time: string | number | Date) => {
        const tm = new Date(time);
        return addZ(tm.getUTCHours())
            + `:${addZ(tm.getUTCMinutes())}`
            + ` UTC`;
    },
    // AM/PM time: 02:15pm
    tmAP = (time: string | number | Date) => {
        const
            tm = new Date(time),
            hrR = tm.getHours();
        return addZ(hrR > 12 ? hrR - 12 : hrR)
            + `:${addZ(tm.getMinutes())}`
            + (hrR >= 12 ? `pm` : `am`);
    },
    // Day of Month: 28th of March
    moDay = (time: string | number | Date) => {
        const
            tm = new Date(time),
            dy = tm.getDate();
        return dy + dayS[
            dy < 5 ? dy - 1
                : dy > 4 && dy < 21 ? 3
                    : dy > 20 && dy < 25 ? dy - 21
                        : dy > 24 && dy < 31 ? 3
                            : 0
        ] + ` of ${monNm[tm.getMonth()]}`;
    },
    // Day + MON: 28 MAR
    shortDt = (time: string | number | Date) => {
        const tm = new Date(time);
        return `${tm.getDate()} ${moMin[tm.getMonth()]}`;
    },
    // MON + Year: MAR 2022
    moYrDt = (time: string | number | Date) => {
        const tm = new Date(time);
        return `${moMin[tm.getMonth()]} ${tm.getFullYear()}`;
    },
    // Day + MON + Year: 28 MAR 2022
    fullDt = (time: string | number | Date) => {
        const tm = new Date(time);
        return `${tm.getDate()} ${moMin[tm.getMonth()]} ${tm.getFullYear()}`;
    },
    // Day + Month + Year: 23 June 2022
    fullDate = (time: string | number | Date) => {
        const tm = new Date(time);
        return `${tm.getDate()} ${monNm[tm.getMonth()]} ${tm.getFullYear()}`;
    },
    // Day of Month, 2022: 28th of March 2022
    fullLong = (time: string | number | Date) =>
        `${moDay(time)} ${new Date(time).getFullYear()}`,
    /** This Year '2025' */
    thisYear = (e?: number | string) =>
        (e ? new Date(e) : new Date)?.getUTCFullYear(),
    /** Date Standard 2022-06-23 */
    dateStandard = (d: string | number | Date): DateString => {
        const dt = new Date(d);
        return `${dt.getUTCFullYear()}-${addZ(dt.getUTCMonth() + 1)}-${addZ(dt.getUTCDate())}`
    },
    /** Time Standard 16:36:14 */
    timeStandard = (dt: Date) => {
        const hr = dt.getUTCHours() + 1;
        return addZ(hr < 0 ? 24 + hr : hr) // hours
            + `:${addZ(dt.getUTCMinutes())}`  // minutes
            + `:${addZ(dt.getUTCSeconds())}`  // seconds
    },
    /**  SEO date: '2022-06-23T16:36:14+01:00' */
    seoDt = (t?: number | string | Date) => {
        !t && (t = tN()); // use current time
        const dt = new Date(t);
        return `${dateStandard(dt)}T${timeStandard(dt)}+01:00`;
    },
    /** invoice #22 06 23 109 */
    invDt = (t: string | number | Date) => {
        const tm = new Date(t);
        return `${tm.getUTCFullYear()}`.split(`20`)[1] // year
            + addZ(tm.getUTCMonth() + 1) // month
            + addZ(tm.getUTCDate()) // day
            + `${t}`.slice(10)
    };

export {
    oneSec,
    oneDay,
    oneHr,
    oneMin,
    oneMon,
    thisYear,
    seoDt,
    dateStandard,
    timeStandard,
    dayRes,
    invDt,
    fullDt,
    fullDate,
    fullLong,
    shortDt,
    moYrDt,
    tmAP,
    tmUTC,
    monNm,
    tN,
    addZ,
}