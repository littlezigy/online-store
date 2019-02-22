module.exports = function sendmail(email, body, res) {
  var mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});
  var processresponse = "\n";

  var data = {
    from: 'Zigy Demo Store <admin_demo@zigy.com>',
    to: email,
    subject: 'You have placed an order.',
    text: body
  };

  console.log("\n----------START EMAIL-------------\n");

  res.write("\n");

  mailgun.messages()
  .send(data, (error, body) => {
    console.log("\nFinally running MAILGUN. Return body is\n", body);
    if (body == undefined || body == false) { 
      console.log("Got nothing from server.");
      res.write("No reply from mail server. Please try again.");
    } else {
      processresponse += body.message;
      console.log("***********************Gotten reply from Mailgun server.*******************************\n", processresponse);
      res.write(processresponse);
    }
  });

  return processresponse;
}