const http = require("http");
const app = require("./app.js");
require("dotenv").config();

const server = http.createServer(app);

const port = process.env.PORT || 8080;

server.listen(port, (req,res)=>{
	console.log(`server listening on http://localhost:${port}`)
})
