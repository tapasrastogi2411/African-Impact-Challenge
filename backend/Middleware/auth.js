// insert authentication code within here
// check if cookie is set and user is logged in
// otherwise send an error response back to the client
module.exports = (req, res, next) => {
    //console.log(req.session.loggedIn); 
    if (!req.session.username) {
        return res.status(404).send("Forbidden");
    }  
    next();
};