"use strict";
const nodemailer = require("nodemailer");
const {
   users
} = require('./server')

// async..await is not allowed in global scope, must use a wrapper
async function main() {

   console.log('inside mailer')
   console.log(users)

   // Generate test SMTP service account from ethereal.email
   // Only needed if you don't have a real mail account for testing
   let testAccount = await nodemailer.createTestAccount();

   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
         user: testAccount.user, // generated ethereal user
         pass: testAccount.pass // generated ethereal password
      }
   });

   // send mail with defined transport object
   let info = await transporter.sendMail({
      from: `jatin6972@gmail.com`, // sender address
      to: `${users[0].email}`, // list of receivers
      subject: ` SUGGESTION    `, // Subject line
      text: ` ${users[0].message}    `, // plain text body
      html: `<b> ${users[0].message}  </b>` // html body
   });

   console.log("Message sent: %s", info.messageId);
   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

   // Preview only available when sending through an Ethereal account
   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);

module.exports = {
   main
}