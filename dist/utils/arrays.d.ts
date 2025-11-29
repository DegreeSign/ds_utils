import { ForecastInput, NumberObj } from "../types";
declare const sumArr: (arr: number[]) => number, maxVl: (array: NumberObj[], item: string | number) => number, minVl: (array: NumberObj[], item: string | number) => number, 
/** Sum Number */
getSum: (numbers: number[]) => number, 
/** Mean Number */
getMean: (numbers: number[]) => number, 
/** Max Number */
getMax: (numbers: number[]) => number, forecastNext: ({ currentPeriod, steps }: ForecastInput) => number[], forecastNextTotal: (currentPeriod: number[]) => number, squeezeArray: ({ arr, targetLength }: {
    arr: number[];
    targetLength: number;
}) => number[], compareArrays: ({ arrays: arraysInput, }: {
    arrays: number[][];
}) => number[][], phaseDifference: ({ array1, array2 }: {
    array1: number[];
    array2: number[];
}) => number;
export { sumArr, minVl, maxVl, getSum, getMean, getMax, forecastNext, forecastNextTotal, squeezeArray, compareArrays, phaseDifference, };
