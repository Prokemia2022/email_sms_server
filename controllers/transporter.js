const nodemailer = require("nodemailer");

let Transporter = nodemailer.createTransport({
    name: 'prokemia.com',
    host: "lon110.truehost.cloud",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'prokemia@prokemia.com', // generated ethereal user
        pass: 'prokemia@prokemia.com', // generated ethereal password 3vk:NrV497X
    },
    tls:{
        rejectUnauthorized:false
    }
});

module.exports = Transporter;