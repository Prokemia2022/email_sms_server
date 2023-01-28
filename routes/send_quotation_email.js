const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router()

router.post("/",async(req,res)=>{
	const email = process.env.SENDER_EMAIL
	console.log(email)
	const payload = req.body
	console.log(payload)

	if (!payload){
		return res.status(400).send("No details were found")
	}else{

		const email_template = `
			<body style='font-family: Poppins; padding: 10px;'>
			  <h2 style="color:#009898;font-size: 36px;text-align: center;">You have a new quotation request for ${payload.name_of_product}</h2>
			  <main style='margin-top: 10px;'>
			    <p style='font-weight: ;'>${payload.requester_email} is seeking information about ${payload.name_of_product}.</p>
			    <p style='font-weight: ;'>They require a quote for ${payload.amount} ${payload.unit} of ${payload.name_of_product} for ${payload.description_for_use}.</p>
			    <p>If you have any questions send us your issues at <a style='color:font-weight: bold;'
			        href='mailto: help@prokemia.com' target="_blank">help@prokemia.com</a>.</br>We would love to hear from you.</p>
			  </main>
			</body>
		`

		  let transporter = nodemailer.createTransport({
		  	name: 'prokemia.com',
		    host: "mail.prokemia.com",
		    port: 465,
		    secure: true, // true for 465, false for other ports
		    auth: {
		      user: 'prokemia@prokemia.com', // generated ethereal user
		      pass: 'Oj+7KkdH4AK}', // generated ethereal password Oj+7KkdH4AK} x)HfVOwlrxYW
		    },
		    tls:{
		    	rejectUnauthorized:false
		    }
		  });

		  // send mail with defined transport object
		  await transporter.sendMail({
		    from: email, // sender address
		    to: payload.email_of_lister, // list of receivers
		    subject: `Quotaion request for ${payload.name_of_product}`, // Subject line
		    text: '', // plain text body
		    html: email_template, // html body
		  }).then(()=>{
		  	return res.status(200).send("Email sent successfully")
		  }).catch((err)=>{
		  	console.log(err)
		  	return res.status(400).send("error while sending email")
		  });
		  // return res.status(200).send("Email sent successfully")
		  //console.log("Message sent: %s", info.messageId);
	}
})

module.exports = router;