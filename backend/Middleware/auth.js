// insert authentication code within here
module.exports = (req, res, next) => {
    console.log("auth");
    next();
};