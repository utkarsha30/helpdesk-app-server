const mongoose = require('mongoose');
const Categories = mongoose.model('Categories');
const postNewCategory = async (bodyDetails)=>{
    return await Categories.create(bodyDetails);
}
const getCategoryById = async (_id)=>{
    return Categories.findById(_id).populate('tickets');
}
module.exports = {
    postNewCategory,
    getCategoryById
}