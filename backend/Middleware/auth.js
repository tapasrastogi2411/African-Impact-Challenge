// insert authentication code within here
// check if cookie is set and user is logged in
// otherwise send an error response back to the client
module.exports = (req, res, next) => {
    console.log("auth");
    next();
};