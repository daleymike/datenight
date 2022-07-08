const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// alternate syntax for exporting controller functions
module.exports = {
    register: (req, res) => {
        // use the object passed in to create a User instance 
        //  this triggers our virtual field creation
        const newUser = new User(req.body);
        console.log(newUser);

        // this is saving to the database and it will trigger our 'pre' save function
        newUser.save()
        .then(() => {
            console.log("successful registration");
            res.json({
                message: "Successfully Registered",
                user: newUser
            }) 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    login: (req, res) => {
        User.findOne({email: req.body.email})
        .then((user) => {
            if(user === null){
                // email address not found
                res.status(400).json({message: "Invalid Email/Password"})
            } else {
                // found valid user
                // varify password is valid
                bcrypt.compare(req.body.password, user.password)
                .then((isPasswordValid) => {
                    // successfully compared password values, but the boolean tells us if they match
                    if(isPasswordValid === true){
                        console.log('password is valid');
                        // create a cookie object
                        // can be called whatever you want
                        res.cookie("usertoken", 
                            jwt.sign({
                                // we can save anything we want in this object and it will be apart of the JWT cookie
                                _id: user._id,
                                username: user.username,
                                email: user.email
                             }, 
                             process.env.JWT_SECRET),
                             {
                                // options for this response cookie
                                httpOnly: true,
                                expires: new Date(Date.now() + 900000000) // time until they have to log in again
                             })
                             // this is returned as res.data
                             .json({
                                message: "Successfully Logged In",
                                userLoggedIn: {
                                    // this can be saved to state if you want to say hello to the user by name 
                                    username: user.username,
                                }

                            })
                    } else {
                        // password is not valid
                        res.status(400).json({message: "Invalid Email/Password"})
                    }
                })
                .catch((err) => {
                    res.status(400).json({message: "Invalid Email/Password"})
                })

            }
        })
        .catch((err) => {
            // specific to errors while looking for the email
            res.status(400).json({message: "Invalid Email/Password"})
        })
    },

    logout: (req, res) => {
        console.log("Logging Out");
        res.clearCookie("usertoken");
        res.json({message: "Successfully Logged Out"});
    }
}