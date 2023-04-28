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

		const delete_email_template = `
			<body style='font-family: Poppins; padding: 10px;'>
			  <h2 style="color:red;font-size: 36px;text-align: center;">Account has been deleted successfully.</h2>
			  <main style='text-align:center'>
			    <p style='text-align:center'> We are sad to see you leave. Your account has been deleted, and you can no longer access your profile.</p>
			    <p style='text-align:center'>All user activity and products listed under this account has been deleted.</p>
			    <p style='text-align:center'>If you have any questions send us your issues at <a style='color:text-align:center'
			        href='mailto: help@prokemia.com' target="_blank">help@prokemia.com</a>.</br>We would love to hear from you.</p>
			  </main>
			</body>
		`

		  // send mail with defined transport object
		  await Transporter.sendMail({
		    from: email, // sender address
		    to: payload.email, // list of receivers
		    subject: "Account Deletetion", // Subject line
		    text: 'Your account has successfully been deleted', // plain text body
		    html: delete_email_template, // html body
		  });
		  return res.status(200).send("Email sent successfully")
		  //console.log("Message sent: %s", info.messageId);
	}
})

module.exports = router;