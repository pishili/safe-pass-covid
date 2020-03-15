import React, { useState, useEffect } from 'react';
import './App.css';
import ReactMapGL from 'react-map-gl';
import { Marker } from 'react-map-gl';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import cities from "./cities.json";
import CityPin from "./city-pin";
const axios = require('axios');

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function App() {

  const classes = useStyles();

  const [state, setState] = useState({
    members: [],
    columns: []
  })

  const [viewport, setViewport] = useState({
    width: 1000,
    height: 1200,
    latitude: 37.777,
    longitude: -122.4376,
    zoom: 8
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



  return (
    <div className="App">
      <header className="App-header">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {state.columns.map(col => <TableCell>{col}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {state.members.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div>
        </div>
      </header>
    </div>
  );
}

export default App;
