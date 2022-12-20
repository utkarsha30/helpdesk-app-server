const ClientService = require('../services/client.service');
getClients= async (req,res)=>{
   const data = await ClientService.getClients();
   res.json({
    status: 'success',
    data: data
});
}
const getClientById = async(req,res)=>{
    const {id} = req.params;
    try{
        const match = await ClientService.getClientById(id);
        if(!match){
            res.status(404).json({
                status: 'error',
                message: 'Client not found'
            });
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
postClientDetails = async (req,res)=>{
    if(Object.keys(req.body).length === 0){
        return res.status(400).json({
            status: 'error',
            message: 'Request body missing'
        });
    }
    try{
        const newClient = await ClientService.postClientDetails(req.body);
    res.status(201).json({
        status: 201,
        data : newClient
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
    getClients,
    postClientDetails,
    getClientById
}