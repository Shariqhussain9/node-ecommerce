const mongoose = require('mongoose');

const connect = () => {
    try{
        mongoose.connect('mongodb+srv://admin:admin@nodejspractice.xhkjbbc.mongodb.net/ecommerce');
        // mongoose.connect('mongodb+srv://admin:admin@nodejspractice.xhkjbbc.mongodb.net/?retryWrites=true&w=majority&appName=NodeJsPractice&collectionName=ecommerce')

    }
    catch(err) {
        console.log(("Error", err))
    }
    console.log("Databse is Connected");
}

module.exports = connect;