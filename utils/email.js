const nodemailer = require('nodemailer')

const sendMail = (recipient, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ItAintMuchButAnHonestWork@gmail.com',
      pass: 'ItAintMuchButHonestWork'
    }
  })

  const mailOptions = {
    from: 'ItAintMuchButAnHonestWork@gmail.com',
    to: recipient,
    subject,
    text,
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(`Error: ${err}`)
    } else {
      console.log('Email Sent!')
    }
  })
}

module.exports = sendMail
