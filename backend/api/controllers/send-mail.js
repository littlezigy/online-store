module.exports = async function sendmail(email, body, res) {
  var mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});
  var processresponse = "\n";
  var timer = 1;

  var data = {
    from: 'Zigy Demo Store <admin_demo@zigy.com>',
    to: email,
    subject: 'You have placed an order.',
    text: body
  };

  console.log("Mailgun");

  await mailgun.messages()
  .send(data, function (error, body) {
    console.log("Sending mail... ", body);
    if (body == undefined || body == false) { 
    } else {
      processresponse += body.message;
      console.log("Message is ", processresponse);
    }
  })
  return processresponse;

  /*function sos() {
    console.log("help");
    setInterval(function () {
      if (processresponse == undefined || processresponse == false) {
        console.log("mail not sent. ", processresponse)
      } else {
        console.log("email reporting for duty ", processresponse);
        clearInterval(setreturnmessae);
        return processresponse;
      }
      if(timer == 15) {
        console.log("We've done this ", timer, "times.");
        //clearInterval(setreturnmessae);
        return ("\nError sending email. Please contact admin.");
      }
    }, 1000);
  }*/
}