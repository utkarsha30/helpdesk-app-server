const mongoose  = require('mongoose');
const ticketsSchema  =  new mongoose.Schema({
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        require: true
    },
    category:{
        type: mongoose.Schema.Types.String,
        ref: 'Categories',
        require: true
    },
    title:{
        type: String,
        required: true 
    },
    description:{
        type: String,
        required: true
    },
    attachments:{
        type:String
    },
    status:{
        type: String,
        emu:[
            "open",
            "processing",
            "pending",
            "closed"
        ]
    },
    priority:{
        type: String,
        emu: [
            "high",
            "medium",
            "low"
        ]
    },
    comment:[
        {
            name: String,
            commentTitle:String,
            commentDescription: String
        }
    ]
});
mongoose.model('Tickets',ticketsSchema);