
const nodemailer = require('nodemailer')

async function mail(email, username) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAILUSER,
        pass: process.env.GMAILPASS
    }
  })

  const message = {
    from: process.env.GMAILUSER,
    to: email,
    subject: "Account creation",
    text: `Hi, ${username} your account is created successfully`,
    html: "<b>registration successful</b>",
  }

  await transporter.sendMail(message)
  console.log("email sent")
}

module.exports = mail;
