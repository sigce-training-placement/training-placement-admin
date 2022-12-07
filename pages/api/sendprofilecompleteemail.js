const express = require('express');
const app = express()
const moment = require('moment')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	auth: {
		user: "training.placement@sigce.edu.in",
		pass: "yuwhehounwomixpy"
	}
}));

// export default function handler(req, res) {
// 	res.send('hello world')
// }


export default function emailhandler(req, res) {
	var mailOptions = {
		from: "Training And Placement Cell SIGCE <training.placement@sigce.edu.in>",
		to: req.body.email,
		subject: 'Profile Complete Request',
		text: `Please Complete your profile`,
		html: `Please Complete your profile`
	};
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			res.json(error)
		} else {
			res.send('Email sent: ' + info.response);
		}
	});
}



app.listen('3001', () => {
	console.log('White-Stripe Backend started on port 3001')
})