import type { ICountryData } from "countries-list";
import { getCountryDataList } from "countries-list";

export const getLocalizedCountryDataList = async (locale: string = "en"): Promise<ICountryData[]> => {
  const countryDataList = getCountryDataList();

  if (locale !== "en") {
    const countryNames = await import(`~/data/countries.${locale}.min.json`);

    for (const countryData of countryDataList) {
      countryData.name = countryNames[countryData.iso2];
    }
  }

  return countryDataList.sort((a, b) => a.name.localeCompare(b.name));
};
