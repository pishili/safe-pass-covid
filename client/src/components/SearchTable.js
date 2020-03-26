import React, { useState, useEffect } from 'react';
import { AddBox, ArrowDownward } from "@material-ui/icons";
import MaterialTable from "material-table";


export default function SearchTable(props) {

  const [state, setState] = useState({
    tableData: [],
    isLoading: false
  })

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

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        columns={[
          { title: "VendorID", field: "vendor_id" },
          { title: "Name", field: "name" },
          { title: "Location", field: "location" },
          { title: "Capacity", field: "capacity" }
        ]}
        data={state.tableData}
        isLoading={state.isLoading}
        title="Demo Title"
      />
    </div>
  )
}
