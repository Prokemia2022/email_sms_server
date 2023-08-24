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

		const created_product_email_template = `
			<body style='font-family: Poppins; padding: 10px;'>
			  <h2 style="color:#009393;font-size: 36px;text-align: center;">Product has been created successfully.</h2>
			  <main style='text-align:center'>
			    <p style='text-align:center'> ${payload.name_of_product} has been created, and is awaiting approval, Stay put and track changes from your dashboard.</p>
				<p style='text-align:center'> Thank you for being a part the Prokemia community.</p>
			    <p style='text-align:center'>If you have any questions send us your issues at <a style='color:text-align:center'
			        href='mailto: help@prokemia.com' target="_blank">help@prokemia.com</a>.</br>We would love to hear from you.</p>
			  </main>
			</body>
		`

		  // send mail with defined transport object
		  await Transporter.sendMail({
		    from: email, // sender address
		    to: payload.email, // list of receivers
		    subject: "Product created", // Subject line
		    text: 'product has successfully been created', // plain text body
		    html: created_product_email_template, // html body
		  });
		  return res.status(200).send("Email sent successfully")
	}
})

module.exports = router;