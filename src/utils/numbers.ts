import { DoubleNumbers } from "../types";

const
    // Numbers system 🧮
    nTxtAr = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
    // smaller than 1
    dNum = [1, 0.1, 0.01, 0.001, 0.0001, 0.00001, 0.000001, 1e-7, 1e-8, 1e-9, 1e-10, 1e-11, 1e-12, 1e-13, 1e-14, 1e-15, 1e-16, 1e-17, 1e-18, 1e-19],
    sNum = (n: number, l: number) => {
        let x = 0; // number of zeros
        for (const e of dNum) {
            if (e < n) {
                return Number(n.toFixed(l + x - 1));
            };
            x++;
        };
        return n;
    },
    /** Round numbers (default 6 digit min) */
    rNum = (a: number, l: number = 6) => {
        const
            n = +a,
            aN = n ? Math.abs(n) : 0,
            x = aN > 1 && l ?
                l - `${Math.round(aN)}`.length
                : 0;

        return !n ? a
            : (n < 0 ? -1 : 1) * ( // number sign
                Number.isInteger(aN) || aN < 1e-16 ? aN
                    : aN > 1e5 ? Math.round(aN)
                        : aN > 1 ? Number(aN.toFixed(x < 0 ? 0 : x))
                            : sNum(aN, l)
            );
    },
    // Comma "," addition for thousands
    addCom = (n: number, l?: number) => {
        const f = (rNum(n, l) + ``).split(".");
        f[0] = f[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return f.join(".");
    },
    /** Present numbers - Add mil, bil tag (default limit = 3) */
    adjNum = (
        inputNum?: number,
        limitDigits: number = 3
    ): string => {

        const n = Number(inputNum);

        if (!inputNum || !n)
            return inputNum + ``;

        const abs = Math.abs(n);

        return (n < 0 ? `-` : ``) + (
            abs > 1e9 ? addCom(abs / 1e9, limitDigits) + "b" // billion
                : abs > 1e6 ? addCom(abs / 1e6, limitDigits) + "m" // million
                    : abs < 1e-6 && abs > 1e-16 ? ((1 + rNum(abs, limitDigits)) + ``).replace(/1./g, `0.`)
                        : addCom(abs, limitDigits)
        );
    },
    // Add zeros
    zNum = (a?: string | number): string => {
        const
            n = Number(a),
            aN = n ? Math.abs(n) : 0;
        let
            z = aN,
            i = 1e10;
        while (i > 1) {
            z > i ? z = Math.round(z / (i / 10)) * (i / 10) : 0
            i = i / 10; // next
        };
        return !n ? (a as string)
            : (n < 0 ? "-" : "")
            + adjNum(z, 2);
    },
    /** precise number (precision to 0.000001) */
    pNum = (e: number) => +e || +e == 0 ?
        Math.round(+e * 1e6) / 1e6
        : null,
    /** max price variation */
    maxPriceVariation = 5 / 100,
    /** Max Prices Variations */
    priceVariations = (numbersWeights: DoubleNumbers[]): number[] => {
        try {

            let sum = 0;

            const
                sorted = [...numbersWeights]
                    .sort((
                        a: DoubleNumbers,
                        b: DoubleNumbers
                    ) => a[0] - b[0]),
                totalWeight = numbersWeights.reduce((
                    total: number,
                    [, weight]: DoubleNumbers
                ) => total + weight, 0),
                weightedMedian = sorted.find(([, weight]: DoubleNumbers) => {
                    sum += weight;
                    return sum >= (totalWeight / 2);
                })![0];

            return numbersWeights
                .filter(
                    ([num,]: DoubleNumbers) => (
                        Math.abs(num - weightedMedian)
                        / weightedMedian
                    ) < maxPriceVariation
                ).map(([num,]: DoubleNumbers) => num);
        } catch {
            return []
        };
    },
    sharpeRatio = ({
        assetPrices,
        minExpectedReturn = 0.05,
    }: {
        assetPrices: number[],
        minExpectedReturn?: number,
    }): number => {
        if (!assetPrices?.length || assetPrices?.length < 2) return 0
        const
            dailyReturns: number[] = assetPrices.slice(1).map(
                (price, i) => (price - assetPrices[i])
                    / assetPrices[i]
            ),
            avgYtdReturn: number = dailyReturns.reduce(
                (sum, ret) => sum + ret, 0
            ) / dailyReturns.length,
            stdDev: number = Math.sqrt(
                dailyReturns.reduce(
                    (sum, ret) => sum +
                        Math.pow(ret - avgYtdReturn, 2),
                    0
                ) / dailyReturns.length
            );
        return (avgYtdReturn - minExpectedReturn) / stdDev;
    },
    isEven = (num: number): boolean => num % 2 === 0;

export {
    rNum,
    adjNum,
    addCom,
    zNum,
    nTxtAr,
    priceVariations,
    sharpeRatio,
    pNum,
    isEven,
}