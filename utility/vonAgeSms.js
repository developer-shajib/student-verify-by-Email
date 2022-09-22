const Vonage = require('@vonage/server-sdk');

const vonage = new Vonage({
  apiKey: "04fe2ed8",
  apiSecret: "vee1yvSgd0j21S71"
});

vonage.verify.request({
    number: '8801614451565',
    brand: 'Vonage SMS'
  }, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      const verifyRequestId = result.request_id;
      console.log('request_id', verifyRequestId);
    }
  });
  

