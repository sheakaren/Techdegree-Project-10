import React from 'react';
import {NavLink} from 'react-router-dom';


const Header = props => {
    return (
        <div>
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo"><NavLink to='/'>Courses</NavLink></h1>
                        <nav><a className="signup" href="sign-up.html">Sign Up</a><a className="signin" href="sign-in.html">Sign In</a></nav>
                </div>
            </div>
        </div>
    )
}

export default Header;