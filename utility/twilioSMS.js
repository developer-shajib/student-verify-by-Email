const dotenv = require('dotenv').config();
const twilio = require('twilio')(process.env.ACCOUNT_SID , process.env.AUTH_TOKEN);


const twilioSMS = async (to,body)=>{ 
    await twilio.messages.create({
    from : process.env.TWILIO_PHONE,
    to : to,
    body : body
})
.then(res=>{
    console.log(`Sms Sent Successfully`);
})
.catch(error=>{
    console.log(error.messages);
})

}

module.exports = twilioSMS;