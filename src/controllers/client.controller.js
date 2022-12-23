const ClientService = require('../services/client.service');
const {Errors} = require('../constants');
getClients= async (req,res)=>{
   const data = await ClientService.getClients();
   res.json({
    status: 'success',
    data: data
});
}
const getClientById = async(req,res,next)=>{
    const {id} = req.params;
    try{
        const match = await ClientService.getClientById(id);
        if(!match){
            const error = new Error(`A client with ${id} does not exist`);
            error.name = Errors.NotFound;
            return next(error);
        }
        res.json({
            status:'success',
            data : match
        });
    }
    catch(error){
        return res.status(404).json({
            status: 'error',
            message: 'API not supported'
        });
    }
}
postClientDetails = async (req,res,next)=>{
    if(Object.keys(req.body).length === 0){
        return res.status(400).json({
            status: 'error',
            message: 'Request body missing'
        });
    }
    try{
        const newClient = await ClientService.postClientDetails(req.body);
    res.status(201).json({
        status: 'success',
        data : newClient
    });
    }
    catch(error){
       return next(error);
    }
    
}
module.exports = {
    getClients,
    postClientDetails,
    getClientById
}