import React, { useState, useEffect } from 'react';
import { AddBox, ArrowDownward } from "@material-ui/icons";
import MaterialTable from "material-table";


export default function SearchTable(props) {

  // const data = [
  //   {
  //     "id": 1,
  //     "vendor_id": 1,
  //     "location": "Downtown",
  //     "capacity": "500"
  //   },
  //   {
  //     "id": 2,
  //     "vendor_id": 3,
  //     "location": "Downtown",
  //     "capacity": "100"
  //   }
  // ]

  const callAPIStores = () => {
    fetch("/stores")
      .then(res => res.text())
      .then(res => {
        let stores = JSON.parse(res)
          .map((i) => {
            return {
              vendor_id: i.vendor_id,
              location: i.location,
              capacity: i.capacity
            }
          })
          setState(prev => ({ ...prev, ...{ tableData: stores, isLoading: false } }))
      })
      .catch(err => err);
  }

  // const data = callAPIStores();
  // console.log(data)

  const [state, setState] = useState({
    tableData: [],
    isLoading: false
  })

  useEffect(() => {
    setState((prev) => ({ ...prev, ...{ isLoading: true} }))
    setTimeout(() => {
      callAPIStores()
    }, 2000);

  }, [])

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        columns={[
          { title: "VendorID", field: "vendor_id" },
          { title: "Location", field: "location" },
          { title: "Capacity", field: "capacity" },
        ]}
        data={state.tableData}
        isLoading={state.isLoading}
        title="Demo Title"
      />
    </div>
  )
}
