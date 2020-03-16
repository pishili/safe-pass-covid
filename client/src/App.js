import React, { useState, useEffect } from 'react';
import './App.css';
import ReactMapGL from 'react-map-gl';
import { Marker } from 'react-map-gl';
import { fade, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import cities from "./cities.json";
import CityPin from "./city-pin";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';


const axios = require('axios');

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
}));


function App() {

  const classes = useStyles();

  const [state, setState] = useState({
    members: [],
    columns: []
  })

  const [viewport, setViewport] = useState({
    width: '100%',
    height: 600,
    latitude: 37.777,
    longitude: -122.4376,
    zoom: 8
  })

  let cityMarkers = cities.map((c) => {
    return (
      <Marker
        latitude={c.latitude}
        longitude={c.longitude}
        offsetLeft={0}
        offsetTop={0}>
        <CityPin />
      </Marker>
    )
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
        console.log(members)
        const columns = ["name", "age", "location"]
        setState(prev => ({ ...prev, ...{ members, columns } }))
      })
      .catch(err => err);
  }

  useEffect(() => {
    callAPI()
  }, [])

  useEffect(() => {
    const latitudeResponse = axios.get("http://localhost:8001/api/days");
    const directionResponse = axios.get(`http://map.googleapis.com/maps/api/${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`);
    const elevationResponse = `https://maps.googleapis.com/maps/api/elevation/json?locations=39.7391536,-104.9847034&key=${process.env.REACT_APP_GOOGLE_ACCESS_TOKEN}`
    Promise.all([
      Promise.resolve(latitudeResponse, elevationResponse),

    ]).then((all) => {
      const [latitudeResponse, elevationResponse] = all

      const lats = latitudeResponse.data
      console.log(`latitudes are ${lats}`);
      const elevations = elevationResponse.data
      console.log(`elevations are ${elevations}`);
      setViewport(prev => ({ ...prev, lats, elevations }));
    });

  }, [setViewport.latitude, setViewport.longitude])



  return (
    <div className={classes.root}>
      <Grid container spacing={3} alignItems="center" alignContent="center" >
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                SafePass
          </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {state.columns.map(col => <TableCell>{col}</TableCell>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {state.members.map(row => (
                  <TableRow>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell>{row.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={2} />
        <Grid container item xs={8} justify="center">
          <ReactMapGL
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            {...viewport}
            onViewportChange={setViewport}
          >
            {cityMarkers}
          </ReactMapGL>
        </Grid>
        <Grid item xs={2} />
      </Grid>

    </div>
  );
}

export default App;
