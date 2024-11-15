import {
  getCountryData,
  getCountryDataList,
  getEmojiFlag,
} from "countries-list";
import {
  getAllContinents,
  getAllCurrencies,
  getAllLanguages,
} from "./appwrite";
import { SITE_LOCALE } from "./constants";
import { groupBy, flatMapDeep, partition, uniq } from "lodash";

export const getDateString = (
  date,
  m = true,
  d = true,
  y = true,
  locale = SITE_LOCALE
) => {
  return new Date(date).toLocaleDateString(locale, {
    month: m ? "short" : undefined,
    day: d ? "numeric" : undefined,
    year: y ? "numeric" : undefined,
  });
};

export const getCountryInfo = async (alpha2Code) => {
  const countryInfo = {};

  // console.log(getCountryData("DK"));

  const { name, iso2, iso3, capital, languages, continent, currency, phone } =
    getCountryData(alpha2Code);

  Object.assign(countryInfo, {
    name,
    codes: { iso2, iso3 },
    capital,
    phone,
    flag: getEmojiFlag(alpha2Code),
  });

  // languages
  const allLanguages = await getAllLanguages();
  const langs = languages.map((lang) =>
    allLanguages.find(({ code }) => code === lang)
  );
  Object.assign(countryInfo, { languages: langs });

  // continent
  const allContinents = await getAllContinents();
  const cont = allContinents.find(({ code }) => code === continent).name;
  Object.assign(countryInfo, { continent: cont, continentCode: continent });

  const allCurrencies = await getAllCurrencies();
  const currs = currency.map((currency) =>
    allCurrencies.find(({ code }) => code === currency)
  );
  Object.assign(countryInfo, { currencies: currs });

  return countryInfo;
};

export const getConflictsPerCountry = (conflicts) => {
  const conflictsPerCountry = {};
  conflicts.map((conflict) => {
    conflict.countries.map(({ code }) => {
      if (!conflictsPerCountry[code]) {
        conflictsPerCountry[code] = [conflict];
      } else {
        conflictsPerCountry[code].push(conflict);
      }
    });
  });
  return conflictsPerCountry;
};

export const getContinentsWithCountries = async () => {
  const continents = await getAllContinents();
  const countriesGroupedByContinent = groupBy(
    getCountryDataList(),
    "continent"
  );
  continents.map((continent) => {
    continent.countries = countriesGroupedByContinent[continent.code];
  });

  return continents;
};

export const getContinentsWithConflicts = async (conflicts) => {
  const conflictsByCountry = getConflictsPerCountry(conflicts);
  const contientsWithCountries = await getContinentsWithCountries();

  // merge conflict data into continets dictionary
  contientsWithCountries.map((continent) => {
    continent.countries.map((country) => {
      country.conflicts = conflictsByCountry[country.iso2];
    });
    continent.uniqueConflicts = uniq(
      flatMapDeep(continent.countries, "conflicts")
    ).filter(Boolean);
  });

  // show only continents that have any conflicts
  const conflictsPerContinents = partition(
    contientsWithCountries,
    (continent) => continent.uniqueConflicts.length
  );

  return {
    conflicted: conflictsPerContinents[0],
    peaceful: conflictsPerContinents[1],
  };
};
