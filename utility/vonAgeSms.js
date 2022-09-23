const Vonage = require('@vonage/server-sdk')
const env = require('dotenv').config();

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET
})

const vonAgeSMS = async (get,msg) =>{
    const from = process.env.VONAGE_API_KEY
    const to = get;
    const text = msg;

   await vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}

module.exports = vonAgeSMS;










// const Vonage = require('@vonage/server-sdk')
// const env = require('dotenv').config();

// //vonage sms server create
// const vonage = new Vonage({
//   apiKey: process.env.VONAGE_API_KEY,
//   apiSecret: process.env.VONAGE_API_SECRET
// })

// //verify sms send
// const vonAgeSMS = (cell,msg) =>{
//     const from = process.env.VONAGE_API_KEY
//     const to = cell;
//     const text = msg;

//     vonage.message.sendSms(from, to, text, (err, responseData) => {
//         if (err) {
//             console.log(err);
//         } else {
//             if(responseData.messages[0]['status'] === "0") {
//                 console.log("Message sent successfully.");
//             } else {
//                 console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
//             }
//         }
//     })
// }

// module.exports = vonAgeSMS;


