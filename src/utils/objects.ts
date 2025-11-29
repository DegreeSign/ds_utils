import { tN } from "./time";

const
    objLen = (obj?: any) => {
        try {
            return Object.keys(obj || {})?.length || 0;
        } catch (e) {
            console.log(e);
            return 0
        };
    },
    objNestValueCount = (obj: any) => {
        let n = 0;
        if (objLen(obj))
            for (const k in obj)
                n += objLen(obj[k]) ?
                    1 : 0;
        return n;
    },
    /** Sort complex object */
    objSort = (
        /** object */
        obj: any = {},
        /** key name */
        key: string,
        /** descending 1 or ascending -1 */
        direction: -1 | 1 = -1
    ): any => Object.fromEntries( // Sorted object
        Object.entries(obj).sort(
            ([, a]: any, [, b]: any) =>
                a[key] === null || a[key] === undefined ? 1
                    : b[key] === null || b[key] === undefined ? -1
                        : a[key] > b[key] ? direction * 1 : direction * -1
        )
    ),
    objSortSimple = (
        obj: any = {},
        /** descending 1 or ascending -1 */
        direction: -1 | 1 = -1
    ): any => Object.fromEntries( // Sort simple object
        Object.entries(obj).sort(
            ([, a], [, b]) => (
                a === null || a === undefined ? 1
                    : b === null || b === undefined ? -1
                        : a > b ? direction * 1 : direction * -1
            )
        )
    ),
    /** Store stringified object */
    storeObjStr = (objString?: string) => { // Store obj
        try {
            return objString?.replace(/"/g, `'`);
        } catch (e) {
            console.log(tN(), `storeObjStr failed`, e)
            return ``
        };
    },
    /** Store any object */
    storeObj = (obj: any) => { // Save array
        try {
            return storeObjStr(JSON.stringify(obj));
        } catch (e) {
            console.log(tN(), `storeObj failed`, e)
            return ``
        };
    },
    /** Restore string object */
    restoreObjStr = (str?: string) => { // Save array
        try {
            return str?.toString()?.replace(/'/g, `"`);
        } catch (e) { console.log(tN(), `restoreObjStr failed`, e) };
    },
    /** Restore any object */
    restoreObj = (str?: string) => { // Save array
        try {
            if (!str) return
            const objStr = restoreObjStr(str);
            return objStr ? JSON.parse(objStr) : undefined
        } catch (e) { console.log(tN(), `restoreObj failed`, e) };
    };

export {
    objSort,
    objSortSimple,
    objLen,
    objNestValueCount,
    storeObjStr,
    storeObj,
    restoreObjStr,
    restoreObj,
}