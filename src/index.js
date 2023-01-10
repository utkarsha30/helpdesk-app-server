require("dotenv/config");
const express = require("express");
var bodyParser = require("body-parser");
const { connect } = require("./db/init");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
//create application object
const app = express();
//to avoid cors policy error
app.use(cors({ origin: "*" }));
// to allow file upload for the cloudnary
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
//for request body data
app.use(express.json());
//whenever the the request body contains form data,  express will make that data available on req body
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(
    '<div style="width:200px; margin: auto auto;"><img width="100%"  src="https://media.tenor.com/2jd3xi2WVt0AAAAC/recurring-settings.gif"></div><div style="width:220px; margin: 0 auto;"><h2>Server is Running...</h2></div>'
  );
});
//routes
app.use("/fAQ", require("./routes/faq.routes"));
app.use("/categories", require("./routes/categories.routes"));
app.use("/client", require("./routes/client.routes"));
app.use("/employee", require("./routes/employees.routes"));
app.use("/tickets", require("./routes/tickets.routes"));
app.use(require("./middleware/errors").resourceNotFound);
app.use(require("./middleware/errors").errorHandler);

const PORT = process.env.PORT || 5001;
connect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server started on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    process.exit(1);
  });
