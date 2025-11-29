import { oneDay } from "./time";

const
    /** Delay Code Running */
    delayCode = async (t: number = 0) =>
        await new Promise(resolve => setTimeout(resolve, t)),
    cacheCheck = ({
        analysisCacheLimit,
        lastUpdated,
        forceRefresh,
    }: {
        analysisCacheLimit: number;
        lastUpdated: number;
        forceRefresh?: boolean;
    }): true | undefined => {
        const tm = Date.now();
        if (
            lastUpdated //  comparison time
            && (
                (!forceRefresh && lastUpdated > (tm - analysisCacheLimit)) // 6 months
                || (forceRefresh && lastUpdated > (tm - oneDay)) // one day
            )
        ) {
            return true;
        };
    };

export {
    delayCode,
    cacheCheck,
}