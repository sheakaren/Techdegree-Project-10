import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

class CreateCourse extends Component {
    constructor(props) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }// end constructor


    state = {
        user: "",
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: ""
    }

    handleStateChanges = (e) => {
        this.setState({title: e.target.value})
        this.setState({description: e.target.value})
        this.setState({estimatedTime: e.target.value})
        this.setState({materialsNeeded: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();

        const userData = JSON.parse(localStorage.getItem('userData'));
        
        axios({
            method: "POST",
            url: 'http://localhost:5000/api/courses',
            data: {
                title: this.state.title,
                description: this.state.description,
                estimatedTime: this.state.estimatedTime,
                materialsNeeded: this.state.materialsNeeded,
                user: userData._id
            },
            auth: {
                username: localStorage.getItem('username'),
                password: localStorage.getItem('password')
            }
        })
        .then(window.location = "/")

    } // end handleSubmit()

    render() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        return (
        <div className="bounds course--detail">
            <h1>Create Course</h1>
            <div>
            <div>
                <form>
                    <div className="grid-66">
                    <div className="course--header">
                    <h4 className="course--label">Course</h4>
                        <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."  /></div>
                            <p>By Karen Shea</p>
                        </div>
                    <div className="course--description">
                        <div><textarea id="description" name="description" className placeholder="Course description..." defaultValue={""} /></div>
                    </div>
                    </div>
                    <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours"  /></div>
                            </li>
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <div><textarea id="materialsNeeded" name="materialsNeeded" className placeholder="List materials..." defaultValue={""} /></div>
                            </li>
                        </ul>
                    </div>
                    </div>
                    <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><button className="button button-secondary"><NavLink to='/'>Cancel</NavLink></button></div>
                </form>
            </div>
            </div>
        </div>
        );
    } // end render()
          

    } // end class CreateCourse


 

export default CreateCourse;