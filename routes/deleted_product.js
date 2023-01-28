const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router()

router.post("/",async(req,res)=>{
	const email = process.env.SENDER_EMAIL
	console.log(email)
	const payload = req.body
	console.log(payload)

	if (!payload){
		return res.status(400).send("No details were found")
	}else{

		const delete_product_email_template = `
			<body style='font-family: Poppins; padding: 10px;'>
			  <h2 style="color:red;font-size: 36px;text-align: center;">Product has been deleted successfully.</h2>
			  <main style='text-align:center'>
			    <p style='text-align:center'> ${payload.name_of_product} has been deleted, and is no longer in the prokemia database.</p>
			    <p style='text-align:center'>If you have any questions send us your issues at <a style='color:text-align:center'
			        href='mailto: help@prokemia.com' target="_blank">help@prokemia.com</a>.</br>We would love to hear from you.</p>
			  </main>
			</body>
		`

		  let transporter = nodemailer.createTransport({
		  	name: 'prokemia.com',
		    host: "mail.prokemia.com",
		    port: 465,
		    secure: true, // true for 465, false for other ports
		    auth: {
		      user: 'prokemia@prokemia.com', // generated ethereal user
		      pass: 'Oj+7KkdH4AK}', // generated ethereal password Oj+7KkdH4AK} x)HfVOwlrxYW
		    },
		    tls:{
		    	rejectUnauthorized:false
		    }
		  });

		  // send mail with defined transport object
		  let info = await transporter.sendMail({
		    from: email, // sender address
		    to: payload.email, // list of receivers
		    subject: "Product deleted", // Subject line
		    text: 'product has successfully been deleted', // plain text body
		    html: delete_product_email_template, // html body
		  });
		  return res.status(200).send("Email sent successfully")
		  //console.log("Message sent: %s", info.messageId);
	}
})

module.exports = router;