import { ForecastInput, NumberObj } from "../types";

const
    /** Forecast cap as a multiple of the period max */
    FORECAST_MAX_MULTIPLE = 3,
    // Array system 🔢
    // Sum array
    sumArr = (arr: number[]) => {
        try {
            return arr?.length ? arr.reduce((k, l) => k + l) : 0;
        } catch (e) {
            console.log(`sumArr failed`, e);
            return 0
        };
    },
    // Max value
    maxVl = (array: NumberObj[], item: string | number) => {
        let max = 0;
        for (let i = 0; i < array.length; i++) {
            const a: NumberObj = array[i];
            a[item] > max && (max = a[item]);
        };
        return max;
    },
    // Min value
    minVl = (array: NumberObj[], item: string | number) => {
        let min = 0;
        for (let i = 0; i < array.length; i++) {
            const a: NumberObj = array[i];
            a[item] < min && (min = a[item])
        };
        return min;
    },
    /** Sum Number */
    getSum = (numbers: number[]) => {
        try {
            if (!numbers?.length) return 0;
            return numbers.reduce((acc, num) => acc + num, 0);
        } catch (e) {
            console.log(`getSum failed`, e);
            return 0;
        };
    },
    /** Mean Number */
    getMean = (numbers: number[]) => {
        try {
            if (!numbers?.length) return 0;
            return getSum(numbers) / numbers.length;
        } catch (e) {
            console.log(`getMean failed`, e);
            return 0
        };
    },
    /** Max Number */
    getMax = (numbers: number[]) => {
        try {
            if (!numbers?.length) return 0;
            return Math.max(...numbers);
        } catch (e) {
            console.log(`getMax failed`, e);
            return 0
        };
    },
    /** Median Number */
    median = (numbers: number[]): number => {
        try {
            if (!numbers?.length) return 0;
            const
                sorted = [...numbers].sort((a, b) => a - b),
                mid = Math.floor(sorted.length / 2);
            return sorted.length % 2 ? sorted[mid]
                : (sorted[mid - 1] + sorted[mid]) / 2;
        } catch (e) {
            console.log(`median failed`, e);
            return 0
        };
    },
    /** Theil–Sen robust trend */
    theilSen = (ys: number[]): {
        slope: number;
        intercept: number;
    } => {
        try {
            const n = ys.length, slopes: number[] = [];
            for (let i = 0; i < n - 1; i++)
                for (let j = i + 1; j < n; j++)
                    slopes.push((ys[j] - ys[i]) / (j - i));
            const slope = median(slopes);
            return { slope, intercept: median(ys.map((y, i) => y - slope * i)) };
        } catch (e) {
            console.log(`theilSen failed`, e);
            return { slope: 0, intercept: 0 };
        };
    },
    forecastNext = ({ currentPeriod, steps = 1 }: ForecastInput): number[] => {
        try {

            // validate data
            const period = (
                Array.isArray(currentPeriod) ? currentPeriod : []
            ).filter(Number.isFinite);
            if (!period.length || steps <= 0)
                return [];

            // too few points: flat mean forecast
            if (period.length < 2) {
                const mean = Math.max(0, getMean(period));
                return Array.from({ length: steps }, () => mean);
            };

            const
                n = period.length,
                { slope, intercept } = theilSen(period),
                level = intercept + slope * (n - 1),
                periodMax = getMax(period),
                cap = periodMax > 0 ?
                    periodMax * FORECAST_MAX_MULTIPLE
                    : Infinity;

            return Array.from({ length: steps }, (_, i) => {
                const h = i + 1;
                const raw = level + slope * n * Math.log1p(h / n);
                return Math.max(0, Math.min(raw, cap));
            });

        } catch (e) {
            console.log(`forecastNext failed`, e);
            return [];
        };
    },
    forecastNextTotal = (currentPeriod: number[]): number => {
        try {
            const arr = forecastNext({
                currentPeriod,
                steps: currentPeriod?.length,
            });
            return getSum(arr);
        } catch (e) {
            console.log(`forecastNextTotal failed`, e);
            return 0;
        };
    },
    squeezeArray = ({
        arr,
        targetLength
    }: {
        arr: number[];
        targetLength: number
    }): number[] => {
        try {
            if (!arr || arr.length === 0 || targetLength <= 0) throw new Error('Invalid input');
            const segmentSize = Math.ceil(arr.length / targetLength);
            return Array.from({ length: targetLength }, (_, i) => {
                const
                    start = i * segmentSize,
                    end = Math.min(start + segmentSize, arr.length),
                    segment = arr.slice(start, end);
                return sumArr(segment);
            }).slice(0, targetLength);
        } catch (e) {
            console.log(`squeezeArray failed`, e);
            return [];
        };
    },
    compareArrays = ({
        arrays: arraysInput,
    }: {
        arrays: number[][];
    }) => {
        try {
            const
                arrays = [...arraysInput],
                minLength = Math.min(...arrays.map(array => array.length));
            for (let x = 0; x < arrays.length; x++)
                arrays.splice(minLength);
            const
                sum: number[] = arrays.map(array => sumArr(array)),
                newArrays: number[][] = [],
                min = Math.min(...sum),
                minIndex = sum.indexOf(min),
                ratio = min / Math.max(...sum);
            for (let x = 0; x < arrays.length; x++) {
                const array = arrays[x];
                newArrays[x] = [];
                if (x == minIndex) {
                    newArrays[x] = array;
                } else for (let i = 0; i < array.length; i++)
                    newArrays[x].push(ratio * array[i]);
            };
            return newArrays
        } catch (e) {
            console.log(`compareArrays failed`, e);
            return arraysInput
        };
    },
    phaseDifference = ({
        array1,
        array2
    }: {
        array1: number[];
        array2: number[];
    }): number => {
        try {
            let
                n = array1.length,
                mean1 = array1.reduce((a, b) => a + b) / n,
                mean2 = array2.reduce((a, b) => a + b) / n,
                x = array1.map(p => p - mean1),
                y = array2.map(p => p - mean2),
                maxLag = Math.floor(n / 2),
                maxCorr = -Infinity,
                bestLag = 0;
            for (let lag = -maxLag; lag <= maxLag; lag++) {
                let
                    corr = 0,
                    normX = 0,
                    normY = 0,
                    overlap = 0;
                for (let i = 0; i < n; i++) {
                    let j = i + lag;
                    if (j >= 0 && j < n) {
                        corr += x[i] * y[j];
                        normX += x[i] * x[i];
                        normY += y[j] * y[j];
                        overlap++;
                    };
                };
                if (normX > 0 && normY > 0 && overlap >= 0.8 * n) {
                    let r = corr / Math.sqrt(normX * normY);
                    if (r > maxCorr) {
                        maxCorr = r;
                        bestLag = lag;
                    };
                };
            };
            return bestLag;
        } catch (e) {
            console.log(`phaseDifference failed`, e);
            return 0;
        };
    };

export {
    sumArr,
    minVl,
    maxVl,
    getSum,
    getMean,
    getMax,
    forecastNext,
    forecastNextTotal,
    squeezeArray,
    compareArrays,
    phaseDifference,
}