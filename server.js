
require('dotenv').config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const path = require('path');


    app.use(express.static(path.join(__dirname, './build')));
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, './build/index.html'));

    });



const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`server is running on port ${port}`));
