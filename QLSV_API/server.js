require('dotenv').config();
const express = require('express');
const connection = require('./src/config/database');
const configViewEngine = require('./src/config/viewEngine');

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME || 'localhost';



// Config view engine
configViewEngine(app);

(async () => {
    try {
        await connection();
        app.listen(port, hostname, () => {
            console.log(`Backend zero app listening on http://${hostname}:${port}`);
        });
    } catch (error) {
        console.log(">>> Error connect to DB: ", error);
    }
})();
