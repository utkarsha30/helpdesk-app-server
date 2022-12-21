require('dotenv/config');
const express = require('express');
var bodyParser = require('body-parser');
const {connect} = require('./db/init');
//create application object
const app = express();
//for request body data
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.use('/fAQ',require('./routes/faq.routes'))
 app.use('/categories',require('./routes/categories.routes'))
app.use('/client',require('./routes/client.routes'))
app.use('/tickets',require('./routes/tickets.routes'))




const PORT = process.env.PORT || 5001;
connect()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server started on http://localhost:${PORT}`);
    });
})
.catch(error=>{
    process.exit(1);
})

