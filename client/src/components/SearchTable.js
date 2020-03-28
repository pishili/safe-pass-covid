import React, { useState, useEffect } from 'react';
import { AddBox, ArrowDownward } from "@material-ui/icons";
import MaterialTable from "material-table";


export default function SearchTable(props) {

  const [state, setState] = useState({
    tableData: [],
    isLoading: false
  })

  // const appointmentsForMorning = ['8 AM', '9 AM', '10 AM', '11 AM']
  // const appointmentsForEvening = ['12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM']

  const callAPIStores = () => {
    fetch("/stores")
      .then(res => res.text())
      .then(res => {
        let stores = JSON.parse(res)
        stores = mapper(stores)
        setState(prev => ({ ...prev, ...{ tableData: stores, isLoading: false } }))
      })
      .catch(err => err);
  }

  useEffect(() => {
    setState((prev) => ({ ...prev, ...{ isLoading: true } }))
    setTimeout(() => {
      callAPIStores()
    }, 2000);

  }, [])

  // go from nested to one row
  const mapper = (data) => {
    // return data;
    const newListData = []
    for (let element in data){
      const newData = {}
      newData["name"] = data[element].name
      newData["location"] = data[element].location
      newData["capacity"] = data[element].capacity
      data[element].slots.map((item) => {
        let key = item.visiting_hour;
        let val = item.reserved_spots;
        newData[key] = val
      })
      newListData.push(newData)
    }
    return newListData
  }

  let columns = [
    { title: "Name", field: "name" },
    { title: "Location", field: "location" },
    { title: "Capacity", field: "capacity" },
    { title: '8 AM', field: '8 AM'},
    { title: '9 AM', field: '9 AM'},
    { title: '10 AM', field: '10 AM'},
    { title: '11 AM', field: '11 AM'},
    { title: '12 PM', field: '12 AM'},
    { title: '1 PM', field: '1 PM'},
    { title: '2 PM', field: '2 PM'},
    { title: '3 PM', field: '3 PM'},
    { title: '4 PM', field: '4 PM'},
    { title: '5 PM', field: '5 PM'},
    { title: '6 PM', field: '6 PM'}
  ]
  // appointmentsForMorning.forEach((item) => {
  //   columns.push({ title: item, field: item })
  // })

  // appointmentsForEvening.forEach((item) => {
  //   columns.push({ title: item, field: item })
  // })

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        columns={columns}
        data={state.tableData}
        isLoading={state.isLoading}
        title="Stores"
        options={{
          padding: "dense",
          exportButton: true,
          filtering: true
        }}
      />
    </div>
  )
}
