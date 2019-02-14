module.exports = function sendsms(toMobileNumber, msgBody) {
  twilio_client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  
  console.log('gone => ', process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  twilio_client.messages.create({
    body: msgBody,
    to: toMobileNumber,
    from: process.env.TWILIO_MOBILE_NUMBER
  }).then(message => console.log(message.sid)).done();
};
