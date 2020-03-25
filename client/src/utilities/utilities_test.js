countriesGeojson = require('./countries.geo.json')
timeseries = require('./timeseries.json');

getCasesForSpecificDatePerCountry = require('./utilities')
addCasesToCountryProperties = require('./utilities')

// {
//   type: 'Feature',
//   id: 'AFG',
//   properties: {
//     name: 'Afghanistan',
//     confirmedCases: 16,
//     recoveredCases: 0,
//     deathCases: 0
//   },
//   geometry: { type: 'Polygon', coordinates: [ [Array] ] }
// }

const cases = timeseries
const countries = countriesGeojson
console.log(addCasesToCountryProperties(cases, countries, "2020-3-15").features[0])