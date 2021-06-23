var express = require('express');
var app = express();
var profile = require('./Routes/ProfileRoutes');
var cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin:"http://localhost:3000", credentials:true,   }) );

//Enabling sessions
var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false, // we do not want to create a session for every request. it might be the same user
    saveUninitialized: true,
    cookie: { secure: true, sameSite: true }
}));

// middleware to handle profile-based routes
app.use('/api/profile/', profile);

//Configure application to use https 
const fs = require('fs');
const https = require('https');
var privateKey = fs.readFileSync( 'server.key' );
var certificate = fs.readFileSync( 'server.crt' );
var config = {
        key: privateKey,
        cert: certificate
};


const PORT = 8080;

/*
https.createServer(config, app).listen(PORT, function () {
    console.log('HTTPS on port %s', PORT);
});
*/


app.listen(PORT, function () {
    console.log('HTTP on port '+PORT);
}); 
