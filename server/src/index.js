"use strict";

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
require('dotenv').config();


app.get('/', function (req, res) {
  res.send(`
    <!DOCTYPE html>
      <html>
      <head>
        <title>Hi</title>
      </head>
      
      <body>
       Hello World
      </body>
    
    </html> 
  `);
})

const server = app.listen(process.env.PORT || PORT, () => {

  console.log("Example app listening on port " + (process.env.PORT || PORT));

});

// it is used by Mocha
module.exports = server;