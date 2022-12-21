const mongoose = require('mongoose');
const FAQ = mongoose.model('FAQ');

const getAllFAQS = ()=>{
    return FAQ.find();
}
const postNewFAQ = (bodyDetails)=>{
    return FAQ.create(bodyDetails);
}
module.exports = {
    postNewFAQ,
    getAllFAQS
}