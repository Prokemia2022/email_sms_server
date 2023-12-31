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

		const otp_password_email_template = `
			<body style='font-family: Poppins; padding: 10px;'>
			  <h2 style="color:#000;font-size: 36px;text-align: center;">Your OTP code to change your password.</h2>
			  <main style='text-align:center'>
			    <p onclick="copyText()" style="text-align:center;background-color: #009393;padding: 10px;color:#fff;border:none;font-size: 20px;font-weight:bold;">${payload.code}</p>
			    <p style='text-align:center'>If you have any questions send us your issues at <a style='color:text-align:center'
			        href='mailto: help@prokemia.com' target="_blank">help@prokemia.com</a>.</br>We would love to hear from you.</p>
			  </main>
			  <script>
		        function copyText() {
		            /* Copy text into clipboard */
		            navigator.clipboard.writeText
		                (${payload.code});
		        }
		    </script>
			</body>
		`

		  // send mail with defined transport object
		await Transporter.sendMail({
		    from: email, // sender address
		    to: payload.email, // list of receivers
		    subject: "Request to change password otp code", // Subject line
		    text: '', // plain text body
		    html: otp_password_email_template, // html body
		  });

		  // console.log("Message sent: %s", info.messageId);
		  return res.status(200).send("Email sent successfully")
	}
})

module.exports = router;