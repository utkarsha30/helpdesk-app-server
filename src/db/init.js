const mongoose = require('mongoose');
require('../models/client');
require('../models/tickets');
const connect = async()=>{
    try{
        await mongoose.connect(`mongodb://localhost:27017/HelpDeskDb`);
        console.log('Connected to db');
    }
    catch(error){
        console.log(error.message);
        throw error;
    }
};
module.exports = {
    connect
};