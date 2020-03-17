// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': {
      property: 'confirmedCases',
      stops: [
        [0, '#3288bd'],
        [100, '#66c2a5'],
        [1000, '#abdda4'],
        [10000, '#e6f598'],
        [100000, '#ffffbf'],
        // [5, '#fee08b'],
        // [6, '#fdae61'],
        // [28461, '#f46d43'],
        // [100000, '#d53e4f']
      ]
    },
    'fill-opacity': 0.8
  }
};

