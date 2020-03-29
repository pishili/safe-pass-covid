// import axios from 'axios';

// const data = [
//   { text: 'Man', value: 500 },
//   { text: 'Woman', value: 300 },
//   { text: 'Man', value: 500 },
// ];

// const callAPIVendors = () => {
//   fetch("/vendors")
//     .then(res => res.text())
//     .then(res => {
//       let vendors = JSON.parse(res)
//       vendors = mapper(vendors)
//       setState(prev => ({ ...prev, ...{ tableData: vendors, isLoading: false } }))
//     })
//     .catch(err => err);
// }

const data = [
  {
    "vendor_id": 6,
    "name": "Persia",
    "reserved_spots": "5",
    "visiting_hour": "1 PM",
    "store_id": 34
  },
  {
    "vendor_id": 3,
    "name": "IGA",
    "reserved_spots": "8",
    "visiting_hour": "4 PM",
    "store_id": 2
  },
  {
    "vendor_id": 1,
    "name": "Costco",
    "reserved_spots": "2",
    "visiting_hour": "9 AM",
    "store_id": 1
  },
  {
    "vendor_id": 5,
    "name": "Wallmart",
    "reserved_spots": "5",
    "visiting_hour": "11 AM",
    "store_id": 33
  },
  {
    "vendor_id": 1,
    "name": "Costco",
    "reserved_spots": "1",
    "visiting_hour": "10 AM",
    "store_id": 3
  },
  {
    "vendor_id": 6,
    "name": "Persia",
    "reserved_spots": "3",
    "visiting_hour": "'1 PM'",
    "store_id": 34
  },
  {
    "vendor_id": 1,
    "name": "Costco",
    "reserved_spots": "6",
    "visiting_hour": "9 AM",
    "store_id": 6
  },
  {
    "vendor_id": 1,
    "name": "Costco",
    "reserved_spots": "2",
    "visiting_hour": "8 AM",
    "store_id": 1
  },
  {
    "vendor_id": 1,
    "name": "Costco",
    "reserved_spots": "4",
    "visiting_hour": "10 AM",
    "store_id": 1
  },
  {
    "vendor_id": 3,
    "name": "IGA",
    "reserved_spots": "1",
    "visiting_hour": "2 PM",
    "store_id": 2
  },
  {
    "vendor_id": 6,
    "name": "Persia",
    "reserved_spots": "1",
    "visiting_hour": "5 PM",
    "store_id": 34
  },
  {
    "vendor_id": 3,
    "name": "IGA",
    "reserved_spots": "7",
    "visiting_hour": "1 PM",
    "store_id": 2
  },
  {
    "vendor_id": 3,
    "name": "IGA",
    "reserved_spots": "2",
    "visiting_hour": "5 PM",
    "store_id": 2
  },
  {
    "vendor_id": 2,
    "name": "Safeway",
    "reserved_spots": "10",
    "visiting_hour": "5 PM",
    "store_id": 4
  }
]


const getTextValueBarChartData = (data) => {
  let result = []
  data.map((item) => {
    let newDict = {}
    newDict["text"] = item.visiting_hour
    newDict["value"] = item.reserved_spots
    result.push(newDict)
  })
  return result;
}

console.log(getTextValueBarChartData(data))
