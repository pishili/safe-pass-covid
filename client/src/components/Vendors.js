import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import VendorTable from './VendorTable'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MUIMenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';


export default function Vendors(props) {
  const {
    data
  } = props;

  const [state, setState] = useState({
    barChartData: [],
    vendorId: 1,
    vendorName: "Costco"
  })

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


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
      <Grid item xs={12}>
        <Box display="flex">
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
          >
            <MUIMenuItem onClick={() => {
              setState(prev => ({ ...prev, ...{ vendorId: 1, vendorName: "Costco" } }))
              handleClose()
            }}>
              Costco
            </MUIMenuItem>
            <MUIMenuItem onClick={() => {
              setState(prev => ({ ...prev, ...{ vendorId: 2, vendorName: "Safeway" } }))
              handleClose()
            }}>
              Safeway
            </MUIMenuItem>
            <MUIMenuItem onClick={() => {
              setState(prev => ({ ...prev, ...{ vendorId: 3, vendorName: "IGA" } }))
              handleClose()
            }}>
              IGA
            </MUIMenuItem>
            <MUIMenuItem onClick={() => {
              setState(prev => ({ ...prev, ...{ vendorId: 4, vendorName: "SaveOnFood" } }))
              handleClose()
            }}>
              SaveOnFood
            </MUIMenuItem>
            <MUIMenuItem onClick={() => {
              setState(prev => ({ ...prev, ...{ vendorId: 5, vendorName: "Wallmart" } }))
              handleClose()
            }}>
              Wallmart
            </MUIMenuItem>
            <MUIMenuItem onClick={() => {
              setState(prev => ({ ...prev, ...{ vendorId: 6, vendorName: "Persia" } }))
              handleClose()
            }}>
              Persia
            </MUIMenuItem>
            <MUIMenuItem onClick={() => {
              setState(prev => ({ ...prev, ...{ vendorId: 7, vendorName: "ChineeseMarket" } }))
              handleClose()
            }}>
              ChineeseMarket
            </MUIMenuItem>
            <MUIMenuItem onClick={() => {
              setState(prev => ({ ...prev, ...{ vendorId: 8, vendorName: "DollarStore" } }))
              handleClose()
            }}>
              DollarStore
            </MUIMenuItem>
          </Menu>
          <Typography variant="h4" color="textSecondary">
            {state.vendorName}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={7}>
        <VendorTable vendorId={state.vendorId} />
      </Grid>
      <Grid item xs={3}>
        <BarChart
          width={400}
          height={300}
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
      <Grid item xs={2}>
        <DropdownMenu userName="Sonia Mobahi">
          <MenuItem text="Costco" onClick={() => {
            setState(prev => ({ ...prev, ...{ vendorId: 1 } }))
          }}
          />
          <MenuItem text="Safeway" onClick={() => {
            setState(prev => ({ ...prev, ...{ vendorId: 2, vendorName: "Safeway" } }))
          }}
          />
          <MenuItem text="IGA" onClick={() => {
            setState(prev => ({ ...prev, ...{ vendorId: 3, vendorName: "IGA" } }))
          }}
          />
          <MenuItem text="SaveOnFood" onClick={() => {
            setState(prev => ({ ...prev, ...{ vendorId: 4, vendorName: "SaveOnFood" } }))
          }}
          />
          <MenuItem text="Wallmart" onClick={() => {
            setState(prev => ({ ...prev, ...{ vendorId: 5, vendorName: "Wallmart" } }))
          }}
          />
          <MenuItem text="Persia" onClick={() => {
            setState(prev => ({ ...prev, ...{ vendorId: 6, vendorName: "Persia" } }))
          }}
          />
          <MenuItem text="ChineeseMarket" onClick={() => {
            setState(prev => ({ ...prev, ...{ vendorId: 7, vendorName: "ChineeseMarket" } }))
          }}
          />
          <MenuItem text="DollarStore" onClick={() => {
            setState(prev => ({ ...prev, ...{ vendorId: 8, vendorName: "DollarStore" } }))
          }}
          />
        </DropdownMenu>
      </Grid>

    </Grid>
  )
}
