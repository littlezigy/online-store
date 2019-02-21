module.exports = async function sendsms(toMobileNumber, msgBody) {
  var processresponse = "\n";
  twilio_client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

  await twilio_client.api
    .accounts(process.env.TWILIO_SID)
    .outgoingCallerIds.list({ phoneNumber: toMobileNumber })
    .then(callerIds => {
      console.log("Checking list of verified numbers...");
      if (callerIds.length > 0) {
        console.log("Found the phonenumber!");

        twilio_client.messages.create({
          body: msgBody,
          to: toMobileNumber,
          from: process.env.TWILIO_MOBILE_NUMBER
        }).then(message => console.log(message.sid)).done();
        processresponse = "You will receive an SMS message with your order details soon.";
      } else {
        processresponse = "This phone number is not in system. Please contact administrator to add your number to the system.";
      }
    });

  for (var i = 1; i < 3; i++){
    if(processresponse == undefined || processresponse == false) {
      i = 1;
      console.log("sms not sent. ", processresponse);
    } else {
      console.log(processresponse);
      i = 3;
      return processresponse;
    }
  }
};
