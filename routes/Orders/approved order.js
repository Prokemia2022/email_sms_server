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

		const verify_email_template = `
			<body style='font-family: Poppins; padding: 10px;'>
			  <h2 style="color:#009898;font-size: 36px;text-align: center;">Your order of ${payload.order_id} has been approved.</h2>
			  <main style='text-align:center'>
			    <p style='text-align:center'> The sale initiated has been approved and is being worked on by our sales team.</p>
			    <p style='text-align:center'> We are happy to work with you.</p>
                <p style='text-align:center'> Ensure the payment details are in order once a sales representative will contact you.</p>
			    <p style='text-align:center'>If you have any questions send us your issues at <a style='color:text-align:center'
			        href='mailto: help@prokemia.com' target="_blank">help@prokemia.com</a>.</br>We would love to hear from you.</p>
			  </main>
			</body>
		`

		  // send mail with defined transport object
		  await Transporter.sendMail({
		    from: email, // sender address
		    to: payload.email, // list of receivers
		    subject: "Order Confirmation", // Subject line
		    text: 'your order has been approved.', // plain text body
		    html: verify_email_template, // html body
		  }).then(()=>{
			 return res.status(200).send("Email sent successfully")	  	
		  }).catch((err)=>{
		  	console.log(err)
		  	return res.status(500).send(err)
		  })

		  //console.log("Message sent: %s", info.messageId);
		 
	}
})

module.exports = router;