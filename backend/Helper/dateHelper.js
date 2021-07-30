var dateHelper = (function() {
    var dateHelper = {};

    dateHelper.getCurrentDate = function() {
        var currentdate = new Date(); 
        var datetime = currentdate.getFullYear() + "-" 
            + (currentdate.getMonth()+1) + "-"
            + currentdate.getDate() + " "
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
        return datetime;
    };

    dateHelper.getExpiryDate = function(addMin) {
        var currentdate = new Date(); 
        var newDate = new Date(currentdate.getTime() + addMin*60000);
        var datetime = newDate.getFullYear() + "-" 
            + (newDate.getMonth()+1) + "-"
            + newDate.getDate() + " "
            + newDate.getHours() + ":"  
            + newDate.getMinutes() + ":" 
            + newDate.getSeconds();
        return datetime;
    };

    return dateHelper;

}());

module.exports = dateHelper;