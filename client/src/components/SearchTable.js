import React, { useState, useEffect } from 'react';
import { AddBox, ArrowDownward } from "@material-ui/icons";
import MaterialTable from "material-table";

export default function SearchTable(props) {

  const data = [
    {
      "id": 1,
      "vendor_id": 1,
      "location": "Downtown",
      "capacity": "500"
    },
    {
      "id": 2,
      "vendor_id": 3,
      "location": "Downtown",
      "capacity": "100"
    }
  ]

  const [state, setState] = useState({
    tableData: [],
    isLoading: false
  })

  useEffect(() => {
    setState((prev) => ({ ...prev, ...{ isLoading: true} }))
    setTimeout(() => {
      setState((prev) => ({ ...prev, ...{ tableData: data, isLoading: false} }))
    }, 2000);

  }, [])

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        columns={[
          { title: "VendorID", field: "vendor_id" },
          { title: "Location", field: "location" },
        ]}
        data={state.tableData}
        isLoading={state.isLoading}
        title="Demo Title"
      />
    </div>
  )
}
