declare const 
/** Delay Code Running */
delayCode: (t?: number) => Promise<unknown>, cacheCheck: ({ analysisCacheLimit, lastUpdated, forceRefresh, }: {
    analysisCacheLimit: number;
    lastUpdated: number;
    forceRefresh?: boolean;
}) => true | undefined;
export { delayCode, cacheCheck, };
