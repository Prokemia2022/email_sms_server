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

		const approve_account_email_template = `
			<body style='font-family: Poppins; padding: 10px;'>
			  <h2 style="color:green;font-size: 36px;text-align: center;">Your account has been approved.</h2>
			  <main style='text-align:center'>
			    <p style='text-align:center'> We are delighted to notify you that your account has been approved .</p>
			    <p style='text-align:center'>You can access features in our platform and use your account appropriately as per our company's guidelines.</p>
			    <p style='text-align:center'>Welcome and we appreciate you for joining our community.</p>
			    <p style='text-align:center'>If you have any questions send us your issues at <a style='color:text-align:center'
			        href='mailto: help@prokemia.com' target="_blank">help@prokemia.com</a>.</br>We would love to hear from you.</p>
			  </main>
			</body>
		`

		  // send mail with defined transport object
		await Transporter.sendMail({
		    from: email, // sender address
		    to: payload.email, // list of receivers
		    subject: "Prokemia Account Approved", // Subject line
		    text: 'Your account has approved', // plain text body
		    html: approve_account_email_template, // html body
		  });

		  // console.log("Message sent: %s", info.messageId);
		  return res.status(200).send("Email sent successfully")
	}
})

module.exports = router;