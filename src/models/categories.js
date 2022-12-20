const mongoose  = require('mongoose');
const categoriesSchema = new mongoose.Schema({
    name:{
        type:String,
        requied : true
    },
    description:{
        type:String,
        required: true
    }
});

mongoose.model('Categories',categoriesSchema);