

async function sendOtp(email, otp){
   
const data = {
    sender:{
        name:process.env.BREVO_NAME,
        email: process.env.BREVO_EMAIL

    },
    to:[{email}],
    subject:"Password reset OTP",
     htmlContent: `<p> your OTP is:</p>
        <h1 style = "color:blue;">${otp}</h1>
        <p>This will expire in 5 minutes</p>`
};
const res = await fetch (process.env.BREVO_API,{
    method: "POST",
    headers:{
        "accept": "application/json",
        'api-key':process.env.BREVO_API_KEY,
        "content-type": "application/json"
    },
    body: JSON.stringify(data)
});
if(!res.ok) throw new Error("Brevo API failed");

}
export default sendOtp;