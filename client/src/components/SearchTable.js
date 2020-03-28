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
    for (let element in data) {
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

  const cellStyle = (cellData, rowData) => {
    let style = {}
    const capacity = rowData.capacity
    // const reserved = cellData ? Number(cellData) : 0
    const reserved = cellData
    let ratio = 0
    if (reserved) {
      ratio = (Number(reserved) / Number(capacity))*100
    }
    if (ratio < 50) {
      // style.backgroundColor = 'green'
      
    } else if (ratio <75){
      // style.backgroundColor = 'yellow'
    } else {
      // style.backgroundColor = 'red'
    }
    return style
  }

  const getRenderColumn = (time) => {

    const renderColumn = (rowData) => {
      let ratio = (Number(rowData[time]) / Number(rowData.capacity)) * 100
      ratio = ratio ? ratio : 0
      let render = undefined
      if (ratio < 50) {
        render = <div>{"can register"}</div>
      } else if (ratio <99){
        render = <div>{"almost full"}</div>
      } else {
        render = <div>{"closed"}</div>
      }
      return render
    }

    return renderColumn
  }

  let columns = [
    {
      title: "Name",
      field: "name",
      cellStyle: cellStyle
    },
    { title: "Location", field: "location" },
    { title: "Capacity", field: "capacity" },
    { title: '8 AM', field: '8 AM', cellStyle: cellStyle, render: getRenderColumn('8 AM') },
    { title: '9 AM', field: '9 AM', cellStyle: cellStyle, render: getRenderColumn('9 AM') },
    { title: '10 AM', field: '10 AM', cellStyle: cellStyle, render: getRenderColumn('10 AM') },
    { title: '11 AM', field: '11 AM', cellStyle: cellStyle },
    { title: '12 PM', field: '12 AM', cellStyle: cellStyle },
    { title: '1 PM', field: '1 PM', cellStyle: cellStyle },
    { title: '2 PM', field: '2 PM', cellStyle: cellStyle },
    { title: '3 PM', field: '3 PM', cellStyle: cellStyle },
    { title: '4 PM', field: '4 PM', cellStyle: cellStyle },
    { title: '5 PM', field: '5 PM', cellStyle: cellStyle },
    { title: '6 PM', field: '6 PM', cellStyle: cellStyle }
  ]

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
