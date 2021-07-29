module.exports = (req, res, next) => {
    if (!req.session.username) {
        return res.status(404).send("Forbidden");
    }  
    next();
};