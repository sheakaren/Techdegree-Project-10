import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

class Courses extends Component {
    constructor(props) {
        super();
        this.state = {
            courses: [],
            loading: true
        };
    } // end constructor

    componentDidMount(){
        axios.get('http://localhost:5000/api/courses')
        .then(results => {
            this.setState({
                courses: results.data,
                loading: false
            })
        })
    }; // end componentDidMount()

    render() {
        const courses = this.state.courses;
        const loading = this.state.loading;
        if (loading) {
            return <div className="course--title">One moment, please. Loading...</div>
        } else return (
            <div className="bounds"> 
                {courses.map(course => <div key={course._id} className="grid-33">
                    <NavLink to={`/courses/${course._id}`} className="course--module course--link" > 
                        <h4 className="course--label">Course</h4>  
                        <h3 className="course--title">{course.title}</h3>  
                    </NavLink> 
            </div>
        )}  
                <div className="grid-33">
                    <NavLink to='/courses/newcourse' className="course--module course--add--module" >
                        <h3 className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                                </svg>New Course</h3>
                    </NavLink>
                </div>
            </div>
        ) // end return()
    } // end render()
} // end class Courses

export default Courses;