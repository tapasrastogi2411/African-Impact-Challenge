const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'AfricanImpactChallengeTesting@gmail.com',
      pass: 'backend/db/schema/AIC.ddl'
    }
});
  
// var mailOptions = {
//     from: 'AfricanImpactChallengeTesting@gmail.com',
//     to: 'aaronjacob.tan@mail.utoronto.ca',
//     subject: 'African Impact Challenge Account Recovery Code',
//     html: `
//         <p>Hi, </p>
//         <p>We received a request to reset your African Impact Challenge account password.
//         Enter the following password reset code:</p>
//     `
// };


let sendEmail = function(mailOptions) {
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = sendEmail;
