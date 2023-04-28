const express = require("express");
const Transporter = require('../controllers/transporter.js');

const router = express.Router()

router.post("/",async(req,res)=>{
	const email = process.env.SENDER_EMAIL
	console.log(email)
	const payload = req.body
	console.log(payload)

	if (!payload){
		return res.status(400).send("No details were found")
	}else{

		const suspend_account_email_template = `
			<body style='font-family: Poppins; padding: 10px;'>
			  <h2 style="color:red;font-size: 36px;text-align: center;">Your account has been suspended.</h2>
			  <main style='text-align:center'>
			    <p style='text-align:center'> We are sad to notify you that your account has been flagged for suspension following unprecedented use of our platform or you did not meet our guidelines.</p>
			    <p style='text-align:center'>You can no longer access features in our platform your profile.</p>
			    <p style='text-align:center'>We apologise for the inconvenience.</p>
			    <p style='text-align:center'>If you have any questions send us your issues at <a style='color:text-align:center'
			        href='mailto: help@prokemia.com' target="_blank">help@prokemia.com</a>.</br>We would love to hear from you.</p>
			  </main>
			</body>
		`

		  // send mail with defined transport object
		  await Transporter.sendMail({
		    from: email, // sender address
		    to: payload.email, // list of receivers
		    subject: "Account Suspension", // Subject line
		    text: 'Your account has suspended', // plain text body
		    html: suspend_account_email_template, // html body
		  });

		  // console.log("Message sent: %s", info.messageId);
		  return res.status(200).send("Email sent successfully")
	}
})

module.exports = router;