import nodemailer from "nodemailer";

async function sendOtp(email, otp){
    const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port:587,
        auth: {
            user: "9c53b7001@smtp-brevo.com",
            pass: "LAF9cfYBz1rR5kD6"
        }
    });


    const mailOptions={
        from: "cornflix <jjjbbbb736@gmail.com>",
        to: email,
        subject: "Password reset OTP",
        html: `<p> your OTP is:</p>
        <h1 style = "color:blue;">${otp}</h1>
        <p>This will expire in 5 minutes</p>`

    };
    return transporter.sendMail(mailOptions);
}
export default sendOtp;