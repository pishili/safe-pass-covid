import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import axios from "axios";
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';


export default function Vendors(props) {
  const {
    data
  } = props;

  const [state, setState] = useState({
    barChartData: [],
    vendorId: 1
  })

  useEffect(() => {
    axios.get(`/vendors/${state.vendorId}`)
      .then(res => res.data)
      .then(res => {
        let barChartData = res
        barChartData.map((i) => {
          return {
            time: i.visiting_hour,
            totalReservedSpots: i.reserved_spots
          }
        }, [])
        const columns = ["Time", "TotalReservedSpots"]
        setState(prev => ({ ...prev, ...{ barChartData, columns } }))
      })
      .catch((err) => {
        console.log(err.response.status);
        console.log(err.response.headers);
        console.log(err.response.data);
      });
  }, [state.vendorId])

  return (
    <Grid container spacing={6}>
      <Grid item xs={3} />
      <Grid item xs={6}>
        <BarChart
          width={700}
          height={450}
          data={state.barChartData.map((item) => {
            return { "text": item.visiting_hour, "value": item.reserved_spots }
          })}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="text" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" name="Reserved" fill="#468499" />

        </BarChart>
      </Grid>
      <Grid item xs={3}>
        <DropdownMenu userName="Sonia Mobahi">
          <MenuItem text="Costco" onClick={() => {
            setState(prev => ({ ...prev, ...{ vendorId: 1 } }))
          }}
          />
          <MenuItem text="Safeway" onClick={() => {
            setState(prev => ({ ...prev, ...{ vendorId: 2 } }))
          }}
          />
          <MenuItem text="IGA" onClick={() => {
            setState(prev => ({ ...prev, ...{ vendorId: 3 } }))
          }}
          />
          <MenuItem text="SaveOnFood" onClick={() => {
            setState(prev => ({ ...prev, ...{ vendorId: 4 } }))
          }}
          />
          <MenuItem text="Wallmart" onClick={() => {
            setState(prev => ({ ...prev, ...{ vendorId: 5 } }))
          }}
          />
          <MenuItem text="Persia" onClick={() => {
            setState(prev => ({ ...prev, ...{ vendorId: 6 } }))
          }}
          />
          <MenuItem text="ChineeseMarket" onClick={() => {
            setState(prev => ({ ...prev, ...{ vendorId: 7 } }))
          }}
          />
          <MenuItem text="DollarStore" onClick={() => {
            setState(prev => ({ ...prev, ...{ vendorId: 8 } }))
          }}
          />
        </DropdownMenu>
      </Grid>

    </Grid>
  )
}
