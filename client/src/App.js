import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

var {User, Course} = require("../../api/models");



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path= '/' render={() => <Course/>}/>
      </BrowserRouter>
    );
  }
}

export default App;
