const ClientService = require('../services/client.service');
getClients= (req,res)=>{
   const data =  ClientService.getClients();
   res.json({
    status:data
})
}
module.exports = {
    getClients
}