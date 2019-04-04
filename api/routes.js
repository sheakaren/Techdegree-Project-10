
'use strict';

var express = require("express");
const bcrypt = require('bcryptjs');
const auth = require('basic-auth');

var {User, Course} = require("./models");

var router = express.Router();


// // // // // // // // // // // // 
// User Authentication Middleware //
// // // // // // // // // // // // 

// This array is used to keep track of user records as they are created. ---- GOOD
const authenticateUser = (req, res, next) => {
    const credentials = auth(req);
    if (credentials) {
      User.findOne({ emailAddress: credentials.name }, function(err, user) {
        if (user) {
          const authenticated = bcrypt.compareSync(credentials.pass, user.password);
        if (authenticated) {
            console.log(`Authentication successful for user: ${user.firstName} ${user.lastName}!`);
            // Store the user on the Request object.
            req.currentUser = user;
            next();
          } else {
            err = new Error("Authentication failure. Username and/or password not valid.");
            err.status = 401;
            next(err);
          }
        } else {
          err = new Error("Authentication failure. Username and/or password not valid.");
          err.status = 401;
          next(err);
        }
      })
    } else {
      res.status(401).json({ message: "Email address and password are required" });
    }
};

router.param("id", function(req, res, next, id){
    Course.findById(id, function(err, doc){
        if (err) return next(err);
        if (!doc) {
            err = new Error("Not Found");
            err.status = 404;
            return next(err);
        }
        req.Course = doc;
        return next();
    })
    .populate('user');
});

// // // // 
// USERS //
// // // // 

// GET Users route ---- GOOD
router.get("/api/users", authenticateUser, function(req, res, next){
    // Returns the currently authenticated user
    const users = req.currentUser;
    return res.json(users);
});

// POST Users route ---- GOOD
router.post("/api/users", function(req, res, next){
    //  Creates a user, sets the Location header to "/", and returns no content

    const user = new User(
        {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        password: bcrypt.hashSync(req.body.password)
        }
    );
    // Add the user to the `users` array.
    user.save(user, function(err){
    if (err) return res.status(400).json({error: err.message});
    res.location('/');
    // Set the status to 201 Created and end the response.
    res.status(201).end();
    });
});


// // // // //
// COURSES  //
// // // // //

// GET Courses route ---- GOOD
router.get("/api/courses", function(req, res, next){
    // Returns a list of courses (including the user that owns each course)
    Course.find()
        .populate('user')
        .exec()
        .then((courses) => {
            //if(err) res.status(400).json({error: err});
            res.status(200);
            return res.send(courses);
        });
});

// GET Courses ID route ---- GOOD
router.get("/api/courses/:id", function(req, res, next){
    // Returns a the course (including the user that owns the course) for the provided course ID
    res.json(req.Course);
});

//  POST Courses route ---- GOOD
router.post("/api/courses", authenticateUser, function(req, res, next){
    // Creates a course, sets the Location header to the URI for the course, and returns no content
    const user = req.currentUser;
    var course = new Course({
        user: user._id,
        title: req.body.title,
        description: req.body.description,
        estimatedTime: req.body.estimatedTime,
        materialsNeeded: req.body.materialsNeeded
    });
    course.save(function(err){
        if (err) return next(err);
        res.location("/" + course.id);
        res.status(201).end();
    });
});

// PUT Courses ID route ---- GOOD
router.put("/api/courses/:id", authenticateUser, function(req, res, next){
    // Updates a course and returns no content

    // Source: https://stackoverflow.com/questions/5024787/update-model-with-mongoose-express-nodejs
    Course.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, course) {
        if (err) return res.status(400).json({error: err.message});
        res.location('/');
        res.status(204);
        return res.json('Course updated successfully!');
    });
});

// DELETE Courses ID route ---- GOOD
router.delete("/api/courses/:id", authenticateUser, function(req, res, next){
    // Deletes a course and returns no content

    // Credit goes to Johnny Louifils
    Course.remove({_id: req.params.id})
        .exec()
        .then(result =>{
            res.location('/');
            res.status(204);  
            return res.json('Course deleted successfully!')         
        })
        .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });  
    });
});

module.exports = router;