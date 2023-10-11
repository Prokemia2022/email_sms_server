const express = require('express');
const cors = require('cors');
const path = require('path')

const app = express();
app.use(express.json());

//const test_email = require("./routes/test.js");
const create_account_email = require("./routes/create_account.js");
const changed_password_email = require("./routes/changed_password.js");
const otp_password_email = require("./routes/send_change_password_email_otp.js");
const deleted_account_email = require("./routes/deleted_account.js");
const created_product_email = require("./routes/created_product.js");
const deleted_product_email = require("./routes/deleted_product.js");
const suspend_product_email = require("./routes/suspend_product.js");
const reactivate_account_email = require("./routes/reactivate_account.js");
const suspend_account_email = require("./routes/suspend_account.js");
const email_verification = require("./routes/email_verification.js");
const quotation_email = require("./routes/send_quotation_email.js");
const sample_email = require("./routes/send_sample_email.js");
const approved_account = require("./routes/approved_account_email.js");
const approved_order = require("./routes/Orders/approved_order.js");
const rejected_order = require("./routes/Orders/rejected_order.js");

let origins = ['https://prokemia-admin-web.vercel.app','https://prokemia-admin-web-musembi77.vercel.app','http://localhost:3000','https://prokemia-client-web.vercel.app','http://localhost:5000'];
app.use(cors({credentials:true, origin: "*"}));


//app.use("/api/test_email",test_email);

app.use("/api/create_account_email",create_account_email);//done
app.use("/api/changed_password_email",changed_password_email);//done
app.use("/api/otp_password_email",otp_password_email);//done
app.use("/api/deleted_account_email",deleted_account_email);//done
app.use("/api/created_product_email",created_product_email);//d0ne
app.use("/api/deleted_product_email",deleted_product_email);//d0ne
app.use("/api/suspend_product_email",suspend_product_email);
app.use("/api/suspend_account_email",suspend_account_email);//done
app.use("/api/reactivate_account_email",reactivate_account_email);//done
app.use("/api/email_verification",email_verification);//done
app.use("/api/quotation_email",quotation_email);//done
app.use("/api/sample_email",sample_email);//done
app.use("/api/approved_account_email",approved_account);//done
app.use("/api/approved_order_email",approved_order);//done
app.use("/api/reject_order_email",rejected_order);//done

app.get('/',(req,res)=>{
	res.send("<html> <head>server Response</head><body><h1> This page was render directly from the server <p>Hello there welcome to Prokemia</p></h1></body></html>")
})

module.exports = app;