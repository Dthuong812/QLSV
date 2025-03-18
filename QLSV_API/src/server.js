require('dotenv').config();
const express = require('express');
const connection = require('./config/database');
const configViewEngine = require('./config/viewEngine');
const studentRoute = require('./routes/studentRoute')
const passwordRouter = require('./routes/authRoute')
const forumRouter = require('./routes/forumRoute')

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME || 'localhost';

const student = require('./models/Student');
const forum = require('./models/Forum');
const post = require('./models/Post');
const comment = require('./models/Comment');

// Config view engine
configViewEngine(app);

app.use('/v1/student/', studentRoute);
app.use('/v1/auth', passwordRouter);
app.use('/v1/forum', forumRouter);
(async () => {
    try {
        await connection();
        app.listen(port, hostname, () => {
            console.log(`Backend zero app listening on http://${hostname}:${port} `);
        });
    } catch (error) {
        console.log(">>> Error connect to DB: ", error);
    }
})();
