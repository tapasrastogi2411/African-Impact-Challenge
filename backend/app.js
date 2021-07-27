var express = require('express');
var app = express();
var profile = require('./Routes/ProfileRoutes');
var course = require('./Routes/CoursesRoutes');
app.use('/uploads', express.static('uploads'));
var cors = require('cors');
const root = require("path").join(__dirname, "../frontend/build");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin:"http://localhost:3000", credentials:true }) );
const favicon = require('express-favicon');

app.use(favicon(__dirname + '/favicon.png'));

//Enabling sessions
var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false, // we do not want to create a session for every request. it might be the same user
    saveUninitialized: true,
    cookie: {sameSite: true }, // removed secure=true since not using http 
}));

// middleware to handle profile-based routes
app.use('/api/profile/', profile);
app.use('/api/course/', course);

console.log(process.env.NODE_ENV);
console.log(__dirname + '/favicon.png');
//if (process.env.NODE_ENV === 'production') {
    app.use(express.static(root));
    app.get('*', (req, res) => {
        res.sendFile("index.html", { root });
    });
//} 
    


const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
    console.log('HTTP on port '+PORT);
}); 
