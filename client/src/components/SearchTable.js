import React, { useState, useEffect } from 'react';
import { AddBox, ArrowDownward } from "@material-ui/icons";
import MaterialTable from "material-table";


export default function SearchTable(props) {

  const [state, setState] = useState({
    tableData: [],
    isLoading: false
  })

  const appointmentsForMorning = ['8 AM', '9 AM', '10 AM', '11 AM']
  const appointmentsForEvening = ['12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM']


  const callAPIStores = () => {
    fetch("/stores")
      .then(res => res.text())
      .then(res => {
        let stores = JSON.parse(res)
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

  let columns = [
    { title: "Name", field: "name" },
    { title: "Location", field: "location" },
    { title: "Capacity", field: "capacity" }
  ]
  appointmentsForMorning.forEach((item) => {
    columns.push({ title: item, item })
  })

  appointmentsForEvening.forEach((item) => {
    columns.push({ title: item, item })
  })

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
