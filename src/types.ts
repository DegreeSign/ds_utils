interface NumberObj {
    [key: string]: number
};

interface NumberObjObj {
    [key: string]: NumberObj
};

interface StringObj {
    [key: string]: string
};

interface StringObjObj {
    [key: string]: StringObj
};

interface BooleanObj {
    [key: string]: boolean
}

interface SetupData {
    data: string,
    password: string
}

type DoubleNumbers = [number, number];

type DateString = `${number}-${string}-${string}`;

type DateStringAll = `last24h` | DateString;

type DatePeriodString = DateStringAll | `${DateString},${DateString}`;

interface ForecastInput {
    currentPeriod: number[];
    steps?: number;
};

export {
    NumberObj,
    NumberObjObj,
    StringObj,
    StringObjObj,
    BooleanObj,
    SetupData,
    DoubleNumbers,
    ForecastInput,
    DateString,
    DateStringAll,
    DatePeriodString,
}