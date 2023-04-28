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

		const welcome_email_template = `
			<body style='font-family: Poppins; padding: 10px;'>
			  <h2 style="color:#009898;font-size: 36px;text-align: center;">Welcome!</h2>
			  <main style='margin-top: 10px;'>
			    <p style='font-weight: bold;'> Hi, ${payload.name}</p>
			    <p style='font-weight: ;'> Welcome to <span style='color:#009393'></span>prokemia</span>. The Marketplace for
			      ingredients,Polymers and Chemistry.Search, Learn, Engage ,sample , quote and purchase from thousands of
			      distributors - all in one platform.Access all easily.</p>

			    <p>In Order to access your account you need to activate your account by clicking the link below.</p>
			    <a href='https://prokemia-client-web.vercel.app/activate/${payload._id}' target="_blank">
			    	<button style="background-color: #009393;padding: 10px;color:#fff;border:none;font-size: 20px;margin:auto;cursor: pointer;">ActivateAccount</button>
			    </a>
			    <p>If you have any questions send us your issues at <a style='color:font-weight: bold;'
			        href='mailto: help@prokemia.com' target="_blank">help@prokemia.com</a>.</br>We would love to hear from you.</p>
			  </main>
			</body>
		`

		  // send mail with defined transport object
		  await Transporter.sendMail({
		    from: email, // sender address
		    to: payload.email, // list of receivers
		    subject: "Welcome to Prokemia", // Subject line
		    text: 'Activate your account', // plain text body
		    html: welcome_email_template, // html body
		  }).then(()=>{
		  	return res.status(200).send("Email sent successfully")
		  }).catch((err)=>{
		  	console.log(err)
		  	return res.status(400).send("You need to enter a valid email account to register an account with us.")
		  });
		  // return res.status(200).send("Email sent successfully")
		  //console.log("Message sent: %s", info.messageId);
	}
})

module.exports = router;