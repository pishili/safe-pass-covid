import React, { useState, useEffect } from 'react';
import './App.css';
import MapGL, { Source, Layer } from 'react-map-gl';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import countriesGeojson from './countries.geo.json'
import timeseries from './timeseries.json';
import { dataLayer } from './map-style.js';
import SearchTable from "./components/SearchTable"
import BarChart from 'react-bar-chart';
import axios from "axios";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  table: {
    minWidth: 650,
  },
  tooltip: {
    position: 'absolute',
    margin: '8px',
    padding: '4px',
    background: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    'max-width': '300px',
    'font-size': '10px',
    'z-index': 9,
    'pointer-events': 'none',
  }
}));

function App() {

  const classes = useStyles();

  const [state, setState] = useState({
    stores: [],
    members: [],
    columns: [],
    data: null,
    hoveredFeature: null,
    x: null,
    y: null,
    barChartData: []
  })

  useEffect(() => {
    axios.get("/vendors")
      .then(res => res.data)
      .then(res => {
        let barChartData = res
        barChartData.map((i) => {
          return {
            time: i.visiting_hour,
            totalReservedSpots: i.reserved_spots,
            vendorName: i.name
          }
        }, [])
        const columns = ["Time", "TotalReservedSpots", "vendorName"]
        setState(prev => ({ ...prev, ...{ barChartData, columns } }))
      })
      .catch(err => err);
  }, [])

  const [viewport, setViewport] = useState({
    width: '40%',
    borderRadius: 10,
    alignItems: 'right',
    height: 600,
    latitude: 50,
    longitude: -100,
    zoom: 3,
    bearing: 0,
    pitch: 0
  })

  const callAPI = () => {
    fetch("/members")
      .then(res => res.text())
      .then(res => {
        let members = JSON.parse(res)
          .map((i) => {
            return {
              name: i.name,
              age: i.age,
              location: i.location
            }
          })
        const columns = ["Name", "Age", "Location"]
        setState(prev => ({ ...prev, ...{ members, columns } }))
      })
      .catch(err => err);
  }

  const getCaseForDate = (cases, date) => {
    for (let key in cases) {
      const selectedDate = cases[key].filter((item) => {
        return item.date === date
      })
      return selectedDate[0]
    }
  }

  const getCasesForAllDates = (cases, type) => {
    let confirmedPerDate = {}
    for (let key in cases) {
      cases[key].map((item) => {
        if (!(item.date in confirmedPerDate)) {
          confirmedPerDate[item.date] = [item[type]]
        } else {
          confirmedPerDate[item.date].push(item[type])
        }
      })
    }
    return confirmedPerDate;
  }


  useEffect(() => {
    callAPI()
  }, [])

  useEffect(() => {
    const countries = countriesGeojson
    const cases = timeseries
    const confirmed = getCasesForAllDates(cases, 'confirmed')
    const recovered = getCasesForAllDates(cases, 'recovered')
    const deaths = getCasesForAllDates(cases, 'deaths')

    let casesPerCountry = {}
    for (let key in cases) {
      const selectedDay = cases[key].filter((item) => {
        return item.date === "2020-3-15"
      })[0]
      casesPerCountry[key] = selectedDay.confirmed
    }

    for (let f in countries.features) {
      const country = countries.features[f].properties.name
      if (country in casesPerCountry) {
        countries.features[f].properties.confirmedCases = casesPerCountry[country]
      }
    }
    setState(prev => ({ ...prev, ...{ data: countries } }))

  }, [state.data])

  const onHover = (event) => {
    const {
      features,
      srcEvent: { offsetX, offsetY }
    } = event;
    const hoveredFeature = features && features.find(f => f.layer.id === 'data');

    setState(prev => ({ ...prev, ...{ hoveredFeature, x: offsetX, y: offsetY } }));
  };

  const renderTooltip = () => {
    const { hoveredFeature, x, y } = state;

    return (
      hoveredFeature && (
        <div className={classes.tooltip} style={{ left: x, top: y }}>
          <div>Country: {hoveredFeature.properties.name}</div>
          <div>Confirmed Cases: {hoveredFeature.properties.confirmedCases}</div>
        </div>
      )
    );
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth={false}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <AppBar position="static" safe flex style={{ backgroundColor: 'white' }}>
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title} color="textSecondary">
                  SafePass
                </Typography>
                <Button style={{ backgroundColor: 'white' }}>Login</Button>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xs={1} />
          <Grid container item xs={10} justify="center" text-align="right" padding-top="100px">
            <MapGL
              {...viewport}
              mapStyle="mapbox://styles/mapbox/dark-v10"
              onViewportChange={setViewport}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              onHover={onHover}
            >
              <Source type="geojson" data={state.data}>
                <Layer {...dataLayer} />
              </Source>
              {renderTooltip()}
            </MapGL>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={3} />
          <Grid item xs={6}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {state.columns.map(col => <StyledTableCell>{col}</StyledTableCell>)}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.members.map(row => (
                    <TableRow>
                      <StyledTableCell>{row.name}</StyledTableCell>
                      <StyledTableCell>{row.age}</StyledTableCell>
                      <StyledTableCell>{row.location}</StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={3} />
          <Grid item xs={6}>
            <SearchTable
            />
          </Grid>
          <Grid item xs={3} />

          <Grid item xs={12}>
            <div style={{ width: '100%' }}>
              <BarChart ylabel='Reserved Spots'
                height={400}
                width={400}
                data={state.barChartData.map((item) => {
                  return {"text": item.visiting_hour, "value": item.reserved_spots}
                })} />
            </div>
          </Grid>
          <Grid item xs={6} />
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default App;
