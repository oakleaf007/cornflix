import nodemailer from "nodemailer";

async function sendOtp(email, otp){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "laduttyklub@gmail.com",
            pass: "fvgd pdjd mqhc gwhw"
        }
    });


    const mailOptions={
        from: "cornflix <laduttyklub@gmail.com>",
        to: email,
        subject: "Password reset OTP",
        html: `<p> your OTP is:</p>
        <h1 style = "color:blue;">${otp}</h1>
        <p>This will expire in 5 minutes</p>`

    };
    return transporter.sendMail(mailOptions);
}
export default sendOtp;