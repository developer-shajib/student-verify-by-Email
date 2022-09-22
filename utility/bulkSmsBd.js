const dotenv = require('dotenv').config();
const axios = require('axios');

const buklSMSBd = async (to,msg)=>{

   await axios.get(`https://bulksmsbd.net/api/smsapi?api_key=OyZmUPtdRP33H63XT9Cz&type=text&number=${to}&senderid=8809612443877&message=${msg}
    `)
    .then(res=>{
        console.log(`sms sent successfully`);
    })
    .catch(error=>{
        console.log(error.messages);
    })
}

module.exports = buklSMSBd;