const CategoriesService = require('../services/categories.service');

const postNewCategory = async (req,res)=>{
    if(Object.keys(req.body).length === 0){
        return res.status(400).json({
            status: 'error',
            message: 'Request body missing'
        });
    }
    try{
        const newCategory = await CategoriesService.postNewCategory(req.body);
    res.status(201).json({
        status: 201,
        data : newCategory
    });
    }
    catch(error){
        return res.status(404).json({
            status: 'error',
            message: 'API not supported'
        });
    }   
}
module.exports = {
    postNewCategory
}