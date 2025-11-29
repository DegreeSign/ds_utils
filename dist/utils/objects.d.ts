declare const objLen: (obj?: any) => number, objNestValueCount: (obj: any) => number, 
/** Sort complex object */
objSort: (
/** object */
obj: any | undefined, 
/** key name */
key: string, 
/** descending 1 or ascending -1 */
direction?: -1 | 1) => any, objSortSimple: (obj?: any, 
/** descending 1 or ascending -1 */
direction?: -1 | 1) => any, 
/** Store stringified object */
storeObjStr: (objString?: string) => string | undefined, 
/** Store any object */
storeObj: (obj: any) => string | undefined, 
/** Restore string object */
restoreObjStr: (str?: string) => string | undefined, 
/** Restore any object */
restoreObj: (str?: string) => any;
export { objSort, objSortSimple, objLen, objNestValueCount, storeObjStr, storeObj, restoreObjStr, restoreObj, };
