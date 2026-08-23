# Wealth repartition simulator

**What would happen if every income on Earth were shared equally?**
One slider, from the world as it is to a world where everyone earns the average.

Live : https://wealth-repartition-simulator.vercel.app

Built in 2019, one of my first projects. Brought back to life in 2026 without
changing what it is : same map drawn by hand, same single slider, same colours.

## What was wrong

The 2019 version answered its own question with the wrong number.

It computed the world average income as the **unweighted mean of national
averages**, which gives Liechtenstein and its 40 000 inhabitants the same weight
as India and its 1.4 billion. On 2024 data that mean is **$18,837**, while the
real income per person on Earth is **$13,529**. The simulator was handing out
40 % more wealth than exists.

It also used a `starvationLimit` of $5,000 a year, a number that came from
nowhere.

## What changed

| | 2019 | 2026 |
|---|---|---|
| World average | mean of national averages | total income ÷ total people |
| Data | World Bank, 2018 | World Bank, 2024, rebuilt from the API |
| Poverty line | invented, $5,000/year | World Bank low income threshold, $1,135 |
| Stack | CRA 3.2, React 16, Material UI v0 **and** v4, Redux | Vite, React 19, TypeScript, no state library |
| Map | 1 930 lines of generated JSX, one handler per country | the original SVG, one handler, one stylesheet |
| Mobile portrait | refused, "please turn your phone" | supported |

The maths, the colour ramp and the interaction are unchanged.

## What it says

- **640 million people** live in a country classified as low income today.
- Move the slider to **7 %** and that number reaches zero. Seven percent of the
  gap closed is enough to lift every country above the low income line.
- At **100 %**, everyone on Earth would live in an *upper-middle income*
  country, $406 short of the high income threshold.

## What it cannot say

Each country is a single average, so inequality **inside** a country is
invisible. A perfectly equal world by this measure would still hold very rich
and very poor people. The Atlas method also converts at market exchange rates
rather than purchasing power, so a dollar does not buy the same thing
everywhere.

## Sources

- [GNI per capita, Atlas method, current US$](https://data.worldbank.org/indicator/NY.GNP.PCAP.CD) — World Bank
- [Total population](https://data.worldbank.org/indicator/SP.POP.TOTL) — World Bank
- [FY26 country income classification](https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099062525111074500) — World Bank, thresholds in force since 1 July 2025

## Running it

```bash
npm install
npm run dev
```

`npm run data` rebuilds `src/data/countries.ts` from the World Bank API. Pass a
year to change the vintage :

```bash
npm run data 2025
```

It prints the weighted average, the unweighted one, and the World Bank's own
published world aggregate, so a bad join shows up immediately.
