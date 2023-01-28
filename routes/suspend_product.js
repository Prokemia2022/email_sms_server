const express = require("express")
const sgMail = require('@sendgrid/mail')

const router = express.Router()

router.post("/",async(req,res)=>{
	const email = process.env.SENDER_EMAIL
	const payload = req.body

	if (!payload){
		return res.status(400).send("No details were found")
	}
	// using Twilio SendGrid's v3 Node.js Library
	// https://github.com/sendgrid/sendgrid-nodejs
	//javascript
	sgMail.setApiKey(process.env.SENDGRID_API_KEY)
	const msg = {
	  to: payload.email, // Change to your recipient
	  from: email, // Change to your verified sender
	  subject: 'Product suspension',
	  text: `We are sorry to inform you that the product you listed has been suspended. For any information, contact our support at help@prokemia.com`,
	}
	sgMail
	  .send(msg)
	  .then(() => {
	    console.log('Email sent');
	    return res.status(200).send("Email Sent successfully.")
	  })
	  .catch((error) => {
	    console.error(error)
	    return res.status(500).send(error)
	  })
})

module.exports = router;