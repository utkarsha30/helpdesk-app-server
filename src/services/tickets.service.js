const mongoose = require('mongoose');
const Tickets = mongoose.model('Tickets');

const getAllTickets = ()=>{
    return Tickets.find();
}
const postNewTicket = (bodyDetails)=>{
    return Tickets.create(bodyDetails);
}
module.exports = {
    postNewTicket,
    getAllTickets
}