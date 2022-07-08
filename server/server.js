// load up all of our keys and values from the .env file into memory
//  we can access this through an object called process.env
//      as long as this require is first, every file in server folder has access to it

require("dotenv").config();

const express = require("express");
const cors = require('cors')
const app = express();

// when using credentials and cookies we need to add options to our cors config
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./config/mongoose.config')
require('./routes/user.routes')(app);



app.listen(process.env.MY_PORT, () => console.log(`Listening on Port ${process.env.MY_PORT}`));