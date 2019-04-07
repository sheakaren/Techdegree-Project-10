import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

// var {User, Course} = require("../../api/models");



class App extends Component {

  constructor() {
    super();
    this.state = {
      courses: []
    };
  } 


  getCourses = () => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/courses"
    }).then(res => {
      this.setState({courses: JSON.stringify(res.data)})
    })
  }

  componentDidMount() {
    // let courses = axios.get('http://localhost:5000/api/courses').data
    this.getCourses();
    // this.setState({courses: JSON.stringify(courses)})
    console.log(this.state.courses)
    // .then(function (response){
    //   console.log(response.data)

    //   this.setState({
    //     courses: response.data
    //   })
    //   // console.log(this.state.courses)
    // })
      // .catch(function(error) {
      //   console.log(error);
      // });
  }



  render() {
    return (
      <div>
      <h1>Courses</h1>
      {this.state.courses}
      </div>
    );
  }
}

export default App;
