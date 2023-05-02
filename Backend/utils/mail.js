const nodemailer = require("nodemailer");

//generate 6 digit OTP
exports.generateOTP = (otp_length = 6) => {
    let OTP = "";
    for(let i = 1; i <= 6; i++){
        const roundomVAL = Math.round(Math.random()*9)
        OTP += roundomVAL
    }

   return OTP; 
};

exports.generateMailTransporter = () => 
    nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASSWORD,
        },
  });