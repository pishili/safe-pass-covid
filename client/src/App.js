import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [state, setState] = useState({
    apiResponse: ""
  })

  const callAPI = () => {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => {
        console.log(res)
        this.setState({ apiResponse: res })
      })
      .catch(err => err);
  }

  useEffect(() => {
    callAPI()
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
    </div>
  );
}

export default App;
