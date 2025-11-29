import { SetupData } from "../types";
declare const idShuffle: ({ data, password, }: SetupData) => Promise<string>, 
/** max 32 characters */
idRandShort: (length?: number) => string, 
/** random id any length */
idRandLong: (length?: number) => string;
export { idShuffle, idRandShort, idRandLong, };
