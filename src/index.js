const express = require('express');
var bodyParser = require('body-parser');
//create application object
const app = express();
//for request body data
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.use('/client',require('./routes/client.routes'))

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server started on http://localhost:${PORT}`);
});
