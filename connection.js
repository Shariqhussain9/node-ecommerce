const mongoose = require('mongoose');


const connect = () => {
    try{
        mongoose.connect(process.env.MONGO_URL);
        
    }
    catch(err) {
        console.log(("Error", err))
    }
    console.log("Databse is Connected");
}

module.exports = connect;