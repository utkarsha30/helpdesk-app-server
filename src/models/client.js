const mongoose  = require('mongoose');
const clientSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default : 'client'
    }
},{
        toJSON: { virtuals: true },
        toObject: { virtuals: true }

});
clientSchema.virtual( 'tickets', {
    ref: 'Tickets',
    localField: '_id',
    foreignField: 'client' // the field in the other collection (Topic) that references a document in this collection (Workshop)
});
mongoose.model('Client',clientSchema);