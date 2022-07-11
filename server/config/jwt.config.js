const jwt = require('jsonwebtoken');

module.exports = {
    authenticate(req, res, next){
        jwt.verify(
            req.cookies.usertoken, 
            process.env.JWT_SECRET,
            (err, payload) => {
                if(err) {
                    console.log(err);
                    // 401 is authentication error code
                    res.status(401).json({verified: false})
                } else {
                    console.log("Authenticated");
                    next();
                }
            } 
            )
    }
}