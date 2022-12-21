const FAQService = require('../services/faq.service');

const getAllFAQS = async(req,res)=>{
    const FAQS = await FAQService.getAllFAQS();
    res.json({
        status: 'success',
        data: FAQS
    });
}
postNewFAQ = async (req,res)=>{
    if(Object.keys(req.body).length === 0){
        return res.status(400).json({
            status: 'error',
            message: 'Request body missing'
        });
    }
    try{
        const newFAQ = await FAQService.postNewFAQ(req.body);
    res.status(201).json({
        status: 201,
        data : newFAQ
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
    postNewFAQ,
    getAllFAQS
}