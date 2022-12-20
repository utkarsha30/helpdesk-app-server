const mongoose = require('mongoose');
const Categories = mongoose.model('Categories');
const postNewCategory = (bodyDetails)=>{
    return Categories.create(bodyDetails);
}
module.exports = {
    postNewCategory
}