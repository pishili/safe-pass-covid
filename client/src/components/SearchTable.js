import React, { useState, useEffect } from 'react';
import MaterialTable from "material-table";
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import NotInterested from '@material-ui/icons/NotInterested';
import IconButton from '@material-ui/core/IconButton';
import { green, red, yellow } from '@material-ui/core/colors';
import axios from 'axios';
import BarChart from 'react-bar-chart';

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

  const callAPIReservations = (time, storeId) => {
    axios.post("/reservations", {
      customer_id: 8,
      store_id: storeId,
      visiting_day: 90,
      visiting_hour: time
    })
      .then(() => {
        alert("Reserved")
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    setState((prev) => ({ ...prev, ...{ isLoading: true } }))
    setTimeout(() => {
      callAPIStores()
    }, 2000);

  }, [])

  const mapper = (data) => {
    const newListData = []
    for (let element in data) {
      const newData = {}
      newData["storeId"] = data[element].store_id
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
    const reserved = cellData
    let ratio = 0
    if (reserved) {
      ratio = (Number(reserved) / Number(capacity)) * 100
    }
    return style
  }

  const getRenderColumn = (time) => {

    const renderColumn = (rowData) => {
      // console.log(rowData)
      let ratio = Math.floor((Number(rowData[time]) / Number(rowData.capacity)) * 100)
      ratio = ratio ? ratio : 0
      let render = undefined
      if (ratio < 50) {
        render = (
          <div>
            <IconButton color="inherit" aria-label="add" onClick={() => {
              callAPIReservations(time, rowData.storeId)
            }
            }>
              <AddCircleOutline style={{ fill: green['700'] }} />
            </IconButton>
          </div>
        )
      } else if (ratio < 99) {
        render = (
          <div>
            <IconButton color="primary" aria-label="add" onClick={() => {
              callAPIReservations(time, rowData.storeId)
            }}>
              <AddCircleOutline style={{ fill: yellow['800'] }} />
            </IconButton>
          </div>
        )
      } else {
        render = (
          <div>
            <IconButton disabled color="secondary" aria-label="add">
              <NotInterested style={{ fill: red['700'] }} />
            </IconButton>
          </div>
        )
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
    { title: '11 AM', field: '11 AM', cellStyle: cellStyle, render: getRenderColumn('11 AM') },
    { title: '12 PM', field: '12 AM', cellStyle: cellStyle, render: getRenderColumn('12 PM') },
    { title: '1 PM', field: '1 PM', cellStyle: cellStyle, render: getRenderColumn('1 PM') },
    { title: '2 PM', field: '2 PM', cellStyle: cellStyle, render: getRenderColumn('2 PM') },
    { title: '3 PM', field: '3 PM', cellStyle: cellStyle, render: getRenderColumn('3 PM') },
    { title: '4 PM', field: '4 PM', cellStyle: cellStyle, render: getRenderColumn('4 PM') },
    { title: '5 PM', field: '5 PM', cellStyle: cellStyle, render: getRenderColumn('5 PM') },
    { title: '6 PM', field: '6 PM', cellStyle: cellStyle, render: getRenderColumn('6 PM') }
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
