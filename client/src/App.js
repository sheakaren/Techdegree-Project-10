import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import axios from 'axios';

// Import Course components
import Courses from './components/Courses';
// import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
// import UpateCourse from './components/UpdateCourse';

// Import User components
// import UserSignIn from './components/UserSignIn';
// import UserSignOut from './components/UserSignOut';
// import UserSignUp from './components/UserSignUp';

// Import Header component
import Header from './components/Header';


// Shout out to Brian Ball and Dalyn Small for the help

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
    this.getCourses();
    console.log(this.state.courses)
  }

  render() {
    return (
      <BrowserRouter>
      {/* Render the Header component for each page */}
      <Header />
      <Switch>
        {/* Courses */}
        {/* Renders to both paths for user convienence */}
        {/* Cite: https://stackoverflow.com/questions/43994510/react-router-v4-renders-multiple-routes */}
        <Route exact path = "/"  component = {Courses} />
        <Route exact path = "/courses"  component = {Courses} /> 

        {/* Course Detail */}
        {/* <Route exact path="/courses/:id" component = {CourseDetail} */}

        {/* Create Course */}
        <Route exact path="/courses/newcourse" component = {CreateCourse} /> 

        {/* Update Course */}
        {/* <Route exact path="/courses/:id/update" component = {UpdateCourse} />  */}
        
        {/* User Sign In Detail */}
        {/* <Route exact path="/login" component = {UserSignIn} />  */}

        {/* User Sign Out Detail */}
        {/* <Route exact path="/logout" component = {UserSignOut} /> } />  */}

        {/* User Sign Up Detail */}
        {/* <Route exact path="/createaccount" component = {UserSignUp} /> */}
        
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
