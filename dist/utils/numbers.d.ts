import { DoubleNumbers } from "../types";
declare const nTxtAr: string[], 
/** Round numbers (default 6 digit min) */
rNum: (a: number, l?: number) => number, addCom: (n: number, l?: number) => string, 
/** Present numbers - Add mil, bil tag (default limit = 3) */
adjNum: (inputNum?: number, limitDigits?: number) => string, zNum: (a?: string | number) => string, 
/** precise number (precision to 0.000001) */
pNum: (e: number) => number | null, 
/** Max Prices Variations */
priceVariations: (numbersWeights: DoubleNumbers[]) => number[], sharpeRatio: ({ assetPrices, minExpectedReturn, }: {
    assetPrices: number[];
    minExpectedReturn?: number;
}) => number, isEven: (num: number) => boolean;
export { rNum, adjNum, addCom, zNum, nTxtAr, priceVariations, sharpeRatio, pNum, isEven, };
