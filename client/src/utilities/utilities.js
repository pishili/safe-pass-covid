countriesGeojson = require('./countries.geo.json')
timeseries = require('./timeseries.json');

export default function getCasesForSpecificDatePerCountry(cases, date) {
  const countryCasesInSelectedDate = {}
  for (let country in cases) {
    const selectedDate = cases[country].filter((item) => {
      return item.date === date
    })[0]
    countryCasesInSelectedDate[country] = selectedDate
  }
  return countryCasesInSelectedDate;
}

export default function addCasesToCountryProperties(cases, countries, date) {
  const newCountriesWithFeatures = countries;
  const countryCasesInSelectedDate = getCasesForSpecificDatePerCountry(cases, date);
  for (let feature in countries.features) {
    const countryName = countries.features[feature].properties.name;
    if (countryName in countryCasesInSelectedDate) {
      newCountriesWithFeatures.features[feature].properties.confirmedCases = countryCasesInSelectedDate[countryName].confirmed;
      newCountriesWithFeatures.features[feature].properties.recoveredCases = countryCasesInSelectedDate[countryName].recovered;
      newCountriesWithFeatures.features[feature].properties.deathCases = countryCasesInSelectedDate[countryName].deaths;

    }
  }
  return newCountriesWithFeatures;
}
