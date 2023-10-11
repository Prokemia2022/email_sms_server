//Creates the transporter for the email.
const nodemailer = require("nodemailer");

let Transporter = nodemailer.createTransport({
    name: 'prokemia.com',
    host: "mail.prokemia.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'prokemia@prokemia.com',
        pass: 'prokemia@prokemia.com', 
    },
    tls:{
        rejectUnauthorized:false
    }
});

module.exports = Transporter;