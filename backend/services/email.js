

async function sendOtp(email, otp){
   
const data = {
    sender:{
        name: "cornflix",
        email: "jjjbbbb736@gmail.com"

    },
    to:[{email}],
    subject:"Password reset OTP",
     htmlContent: `<p> your OTP is:</p>
        <h1 style = "color:blue;">${otp}</h1>
        <p>This will expire in 5 minutes</p>`
};
const res = await fetch ("https://api.brevo.com/v3/smtp/email",{
    method: "POST",
    headers:{
        "accept": "application/json",
        'api-key':process.env.BREVO_API,
        "content-type": "application/json"
    },
    body: JSON.stringify(data)
});
if(!res.ok) throw new Error("Brevo API failed");

}
export default sendOtp;