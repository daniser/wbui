import type { ICountryData } from "countries-list";
import { getCountryDataList } from "countries-list";

export const getLocalizedCountryDataList = async (locale?: string): Promise<ICountryData[]> => {
  const countryDataList = getCountryDataList();

  if (!locale) {
    const { locale: currentLocale } = useI18n();
    locale = currentLocale.value;
  }

  if (locale !== "en") {
    try {
      const countryNames = await import(`~/data/countries.${locale}.min.json`);

      for (const countryData of countryDataList) {
        countryData.name = countryNames[countryData.iso2];
      }
    } catch (e) {
      console.warn("Error loading localized country names.");
    }
  }

  return countryDataList;
};
