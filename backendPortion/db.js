require('dotenv').config()
const mongoose = require('mongoose');


mongoose.connect( 'mongodb://127.0.0.1:27017/newsDB', 
    { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
        console.log("Connected to Database")
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    })

