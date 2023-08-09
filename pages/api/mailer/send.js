"use strict";
const path = require("path");
const fs = require("fs");
const handlebars = require("handlebars");
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(data) {

  try {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.say-it.fr",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      }
    });

    var templatePath = path.resolve("templates", `${data["template"]}.html`);
    console.log("the template 1: ", templatePath);
    var templateHtml = fs.readFileSync(templatePath, 'utf8');
    console.log("the template 10: ", templateHtml);
    var template = handlebars.compile(templateHtml);

    var replacements = data["content"]
    console.log("the template 2: ", replacements);
    console.log("the template 21: ", template);
    try {
      var htmlToSend = template(replacements);
    }
    catch (err) {
      console.log("the error: ", err);
      return {
        "status": "fail",
        "message": err
      }
    }

    console.log("the template 3: ", htmlToSend);

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `CADYS <no-reply@say-it.fr>`, // sender address
      to: data["email"],
      subject: data["subject"],
      html: htmlToSend, // html body
    },);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return {
      "status": "success",
      "message": "Mail envoyé avec succès"
    }
  } catch (err) {
    return {
      "status": "fail",
      "message": err
    }
  }
}

exports.main = main;