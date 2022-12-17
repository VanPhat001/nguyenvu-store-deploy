const nodemailer = require('nodemailer')

async function sendMail(htmlContent, { from_mail = 'webacc000@gmail.com', from_password = 'xccoiiatwrzxtmxn',
    to_mail, mail_title = 'Test Nodemailer' }) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // don't change this line
        port: 465,
        secure: true,
        auth: {
            user: from_mail,
            pass: from_password,
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    })

    const mainOptions = {
        from: 'NQH-Test nodemailer',
        to: to_mail, // to_mail
        subject: mail_title,
        html: htmlContent
    }

    return await transporter.sendMail(mainOptions)
}


module.exports = { sendMail }