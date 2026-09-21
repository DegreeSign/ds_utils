# DegreeSign Utils SDK

**A zero-dependency TypeScript utility toolkit for numbers, arrays, statistics, forecasting, dates, objects, IDs and cryptography — one import for browser and Node.js.**

[![npm version](https://img.shields.io/npm/v/@degreesign/utils.svg)](https://www.npmjs.com/package/@degreesign/utils)
[![license](https://img.shields.io/npm/l/@degreesign/utils.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178c6.svg)](https://www.typescriptlang.org/)
[![Change Log](https://img.shields.io/badge/changelog-changes.md-blue.svg)](changes.md)

DegreeSign Utils SDK (`@degreesign/utils`) is the developers' dream utils library: a
single, tree-shakeable package that replaces scattered one-off helpers with tested,
defensive utilities for everyday TypeScript and JavaScript work. It is written in
TypeScript, ships its own type definitions, has **no runtime dependencies** and runs
anywhere JavaScript does — browsers, Node.js, React, Vue, Svelte and vanilla projects.

## Table of Contents
- [Why DegreeSign Utils SDK?](#why-degreesign-utils-sdk)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Array & Statistics](#array--statistics)
- [Forecasting](#forecasting)
- [Objects](#objects)
- [Numbers](#numbers)
- [Time & Date](#time--date)
- [IDs & Crypto](#ids--crypto)
- [API Helpers](#api-helpers)
- [TypeScript Types](#typescript-types)
- [FAQ](#faq)
- [Keywords](#keywords)
- [License](#license)

## Why DegreeSign Utils SDK?
- **Zero dependencies** — nothing extra in your bundle or `node_modules`.
- **TypeScript-first** — full type definitions for editors and autocomplete.
- **Universal** — the same API in the browser (`dsUtils` global, UMD) and Node.js (CommonJS).
- **Tree-shakeable** — import only what you use.
- **Defensive by design** — invalid input returns a safe fallback instead of throwing.
- **Broad coverage** — math, statistics, forecasting, dates, numbers, objects, secure IDs and async helpers in one place.

## Installation
Install with your package manager of choice:

```bash
# npm
npm install @degreesign/utils

# yarn
yarn add @degreesign/utils

# pnpm
pnpm add @degreesign/utils
```

Or load it in the browser straight from a CDN:

```html
<script 
  src="https://cdn.jsdelivr.net/npm/@degreesign/utils@1.0.3/dist/browser/degreesign.min.js"
></script>
```

In the browser the library is exposed as the global object `dsUtils`.

## Quick Start
```ts
import { sumArr, getMean, rNum, addCom, forecastNext, dateStandard, idRandLong } from "@degreesign/utils";

sumArr([1, 2, 3]);                          // 6
getMean([1, 2, 3, 4]);                      // 2.5
rNum(1234.56789);                           // 1234.57
addCom(1234567);                            // "1,234,567"
forecastNext({ currentPeriod: [10, 12, 15], steps: 2 }); // next 2 projected values
dateStandard(Date.now());                   // "2026-09-22"
idRandLong(12);                             // random 12-character ID
```

In the browser via the CDN build:

```js
const total = dsUtils.sumArr([1, 2, 3]); // 6
```

## Array & Statistics
Aggregate, summarise and transform numeric arrays.

| Function | Description |
| --- | --- |
| `sumArr(arr)` | Sum an array of numbers (returns `0` for empty or invalid input). |
| `getSum(numbers)` | Safe sum of a numeric array. |
| `getMean(numbers)` | Arithmetic mean of a numeric array. |
| `getMax(numbers)` | Largest value in a numeric array. |
| `maxVl(array, item)` | Max value of a key across an array of objects. |
| `minVl(array, item)` | Min value of a key across an array of objects. |
| `squeezeArray({ arr, targetLength })` | Resample an array into `targetLength` summed segments. |
| `compareArrays({ arrays })` | Normalise multiple arrays onto a shared scale. |
| `phaseDifference({ array1, array2 })` | Best correlation lag (phase shift) between two signals. |

## Forecasting
Trend projection built on the robust Theil–Sen estimator, with non-negative values and a
cap that prevents runaway forecasts.

| Function | Description |
| --- | --- |
| `forecastNext({ currentPeriod, steps })` | Forecast the next `steps` values from a numeric period. |
| `forecastNextTotal(currentPeriod)` | Total of the next period-length forecast. |

## Objects
Sort, inspect and safely persist nested objects.

| Function | Description |
| --- | --- |
| `objLen(obj)` | Number of own keys in an object. |
| `objNestValueCount(obj)` | Count nested object values. |
| `objSort(obj, key, direction)` | Sort an object of objects by a nested key. |
| `objSortSimple(obj, direction)` | Sort a simple key/value object. |
| `storeObj(obj)` | Stringify an object for storage (`"` becomes `'`). |
| `storeObjStr(str)` | Normalise a stored object string. |
| `restoreObj(str)` | Parse a stored object back into a value. |
| `restoreObjStr(str)` | Restore a stored object string (`'` becomes `"`). |

## Numbers
Round, format and analyse numeric values.

| Function | Description |
| --- | --- |
| `rNum(a, l)` | Round a number (default 6 significant digits). |
| `adjNum(inputNum, limitDigits)` | Abbreviate with `m`/`b` suffixes. |
| `addCom(n, l)` | Add thousands separators. |
| `zNum(a)` | Trim a large number to a rounded form. |
| `pNum(e)` | Precise number to `0.000001`. |
| `isEven(num)` | Whether a number is even. |
| `nTxtAr` | Number words `zero` through `ten`. |
| `priceVariations(numbersWeights)` | Keep prices within 5% of the weighted median. |
| `sharpeRatio({ assetPrices, minExpectedReturn })` | Sharpe ratio from a price series. |

## Time & Date
Timestamps, duration constants and human-readable date formats (UTC where noted).

| Function | Description |
| --- | --- |
| `oneSec`, `oneMin`, `oneHr`, `oneDay`, `oneMon` | Millisecond duration constants. |
| `tN()` | Current timestamp (`Date.now()`). |
| `addZ(n)` | Zero-pad a number to two digits. |
| `dateStandard(d)` | ISO date `2022-06-23`. |
| `timeStandard(dt)` | Time `16:36:14`. |
| `seoDt(t)` | SEO/ISO datetime `2022-06-23T16:36:14+01:00`. |
| `thisYear(e)` | Current (or given) UTC year. |
| `invDt(t)` | Invoice-style stamp, e.g. `220623...`. |
| `tmUTC(t)` / `tmAP(t)` | `15:44 UTC` / `02:15pm` times. |
| `fullDt(t)` / `fullDate(t)` / `fullLong(t)` | `28 MAR 2022` / `28 March 2022` / `28th of March 2022`. |
| `shortDt(t)` / `moYrDt(t)` | `28 MAR` / `MAR 2022`. |
| `monNm` / `dayRes` | Month names / daily chart points (90). |

## IDs & Crypto
Generate and obfuscate identifiers.

| Function | Description |
| --- | --- |
| `idRandShort(length)` | Random short ID (up to 32 characters). |
| `idRandLong(length)` | Random alphabetic ID of any length. |
| `idShuffle({ data, password })` | Obfuscate text — a 4-character PIN shuffle, otherwise AES-GCM encryption. |

## API Helpers
Small async and caching utilities.

| Function | Description |
| --- | --- |
| `delayCode(t)` | Await a `setTimeout` delay in milliseconds. |
| `cacheCheck({ analysisCacheLimit, lastUpdated, forceRefresh })` | Whether cached data is still fresh. |

## TypeScript Types
`NumberObj`, `NumberObjObj`, `StringObj`, `StringObjObj`, `BooleanObj`, `SetupData`,
`DoubleNumbers`, `ForecastInput`, `DateString`, `DateStringAll` and `DatePeriodString`
are exported for TypeScript consumers.

## FAQ
**What is DegreeSign Utils SDK?**
A zero-dependency TypeScript utility library published as `@degreesign/utils`, bundling
common helpers for arrays, statistics, forecasting, dates, numbers, objects, IDs and crypto.

**Is DegreeSign Utils SDK free to use?**
Yes. It is open source under the MIT license.

**Does it work in both Node.js and the browser?**
Yes. It ships a UMD build for browsers (global `dsUtils`) and a CommonJS build for Node.js.

**Does it have any dependencies?**
No runtime dependencies — only development tooling.

**Is it TypeScript-ready?**
Yes. Type definitions ship with the package at `dist/index.d.ts`.

**Can I use it with React, Vue, Svelte or vanilla JavaScript?**
Yes. It is framework-agnostic and works with any JavaScript or TypeScript project.

**How do I import only what I need?**
Named imports are tree-shakeable, e.g. `import { rNum } from "@degreesign/utils";`.

## Keywords
TypeScript utility library, JavaScript utils SDK, zero-dependency npm package, number
formatting, array utilities, statistics helpers, data forecasting, date and time
formatting, object sorting and persistence, secure ID generation, AES-GCM encryption,
browser and Node.js utilities, `@degreesign/utils`, DegreeSign Utils SDK.

## License
[MIT](./LICENSE) © DegreeSign
