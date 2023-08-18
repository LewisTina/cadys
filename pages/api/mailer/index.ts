"use strict";
import nodemailer from 'nodemailer';
const path = require("path");
const fs = require("fs");
const handlebars = require("handlebars");

export default async function Mailer(data: any) {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      }
    });

    var templatePath = path.resolve("pages/api/mailer/templates", `${data["template"]}.html`);
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

    const mailOptions = {
      from: `CADYS <${process.env.EMAIL_USER}>`, // sender address
      to: data["email"],
      subject: data["subject"],
      html: htmlToSend, // html body
    }

    // Envoyez l'e-mail
    let info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  } catch (error) {
    console.log(error);
  }
}