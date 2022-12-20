const TicketsService = require('../services/tickets.service');
getAllTickets = async(req,res)=>{
    const tickets = await TicketsService.getAllTickets();
    res.json({
        status: 'success',
        data: tickets
    });
}
postNewTicket = async (req,res)=>{
    if(Object.keys(req.body).length === 0){
        return res.status(400).json({
            status: 'error',
            message: 'Request body missing'
        });
    }
    try{
        const newTicket = await TicketsService.postNewTicket(req.body);
    res.status(201).json({
        status: 201,
        data : newTicket
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
    postNewTicket,
    getAllTickets
}