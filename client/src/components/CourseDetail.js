import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from "react-markdown" // https://www.youtube.com/watch?v=YMpI5Ok1Ur8 <= helped explain things

class CourseDetail extends Component {
    constructor(props) {
        super();
        this.state = {
            courses: [],
            user: [],
            loading: true
        };
    this.handleDelete = this.handleDelete.bind(this);
    } // end constructor

    componentDidMount(){
        axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
        .then(results => {
            this.setState({
                courses: results.data,
                user: results.data.user,
                loading: false
            })
        })
    }; // end componentDidMount()

// delete selected course
handleDelete(event) {
    axios({
        method:'DELETE',
        url: `http://localhost:5000/api/courses/${this.state.course._id}`,
        auth: {
          username: localStorage.getItem('username'),
          password: localStorage.getItem('password')
        }
      })
      .then(window.location = "/")   
} // end handleDelete

    render() {
        const course = this.state.courses;
        const user = this.state.user;
        const isLoggedIn = localStorage.getItem("IsLoggedIn");
        const UserId = JSON.parse(localStorage.getItem("UserId"));
        console.log('hello');
        return (//JSX inside
        <div>
            <div className="actions--bar">
                <div className="bounds">

                    <div className="grid-100">
                    <span>
                        {(isLoggedIn && user._id === UserId) ? ( 
                        <span>
                            <NavLink to={`/courses/${course._id}/update`} className="button">Update Course</NavLink>
                            <NavLink to={"#"} className="button" onClick={this.handleDelete}>Delete Course</NavLink>
                        </span>
                        ) : null} 
                    </span>

                    <NavLink to="/" className="button button-secondary" href="index.html">Return to List</NavLink>
                    </div> {/* end className="grid-100" */}

                </div> {/* end className="bounds" */}
            </div> {/* end className="actions--bar" */}

            <div className="bounds course--detail">
            <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
                <p>
                By: {user.firstName} {user.lastName}
                </p>
                <div className="course--description">
                <ReactMarkdown source={course.description} /> 
                </div> {/* end className="course--description" */}
            </div>  {/* end className="course--header" */}
            
            <div className="grid-25 grid-right">
                <div className="course--stats">
                <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                            <h3>{course.estimatedTime} hours</h3>
                    </li>
                    <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                            <ul>
                                <ReactMarkdown source={` * ${course.materialsNeeded}`} /> 
                            </ul>
                    </li>
                </ul>
                </div> {/* end className="course--stats" */}
            </div> {/* end className="grid-25 grid-right" */}
            </div> {/* end className="bounds course--detail" */}
        </div> 
        );
    } // end render()
} // end class CourseDetail

export default CourseDetail;