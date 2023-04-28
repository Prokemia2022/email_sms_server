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
			  <h2 style="color:#009898;font-size: 36px;text-align: center;">Verify your email Address</h2>
			  <main style='text-align:center'>
			    <p style='text-align:center'> In order to use some of the features in prokemia you need to confrim your email address first.</p>
			    <p style='text-align:center'> Use the code below to verify your email address.</p>
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
		    subject: "Verify your email", // Subject line
		    text: 'Use code to verify your email', // plain text body
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