var express = require('express');
var app = express();
var profile = require('./Routes/ProfileRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// middleware to handle profile-based routes
app.use('/api/profile/', profile);


//Enabling sessions
var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, sameSite: true }
}));

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
https.createServer(config, app).listen(PORT, function () {
    console.log('HTTPS on port %s', PORT);
});
