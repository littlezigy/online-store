module.exports = function sendmail(email, body, res) {
  var mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

  var data = {
    from: 'Zigy Demo Store <admin_demo@zigy.com>',
    to: email,
    subject: 'You have placed an order.',
    text: body
  };

  mailgun.messages().send(data, (error, body) => {
    console.log(body);
  });
}