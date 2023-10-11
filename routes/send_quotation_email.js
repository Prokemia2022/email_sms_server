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

		const email_template = `
			<body style='font-family: Poppins; padding: 10px;'>
			  <h2 style="color:#009898;font-size: 36px;text-align: center;">You have a new quotation request for ${payload.name_of_product} from Prokemia</h2>
			  <main style='margin-top: 10px;'>
			    <p style='font-weight: ;'>${payload.requester_email} is seeking information about ${payload.name_of_product}.</p>
			    <p style='font-weight: ;'>They require a quote for ${payload.amount} ${payload.unit} of ${payload.name_of_product} for ${payload.description_for_use}.</p>
			    <p>If you have any questions send us your issues at <a style='color:font-weight: bold;'
			        href='mailto: help@prokemia.com' target="_blank">help@prokemia.com</a>.</br>We would love to hear from you.</p>
			  </main>
			</body>
		`

		  Transporter.verify(function (error, success) {
			if (error) {
			  console.log(error);
			} else {
			  console.log("Server is ready to take our messages");
			}
		  });

		  // send mail with defined transport object
		  await Transporter.sendMail({
		    from: email, // sender address
		    to: payload.email_of_lister, // list of receivers
		    subject: `Quotaion request for ${payload.name_of_product}`, // Subject line
		    text: '', // plain text body
		    html: email_template, // html body
		  }).then(()=>{
			console.log('email sent')
		  	return res.status(200).send("Email sent successfully")
		  }).catch((err)=>{
		  	console.log(err)
		  	return res.status(400).send("error while sending quotation email")
		  });
	}
})

module.exports = router;