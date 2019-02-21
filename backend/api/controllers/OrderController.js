/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    neworder: async function(req, res) {
        var sendemail = require('./send-mail');
        var sendtext = require('./send-sms');

        var orderdetails = 'New order created at '+ new Date() + '\nItem  ---> Price'; //Message that will be sent to users.
        var item;
        var printcart = await Shoppingcart.findOne({
            where: {
                id: req.body.cart,
                owner: req.body.user
            }
        }).populate('product');
        var ordermessage = '';

        for (items in printcart.product) {
            item = printcart.product[items];
            orderdetails += '\n' + item.name + ' ---> ' + item.price;
        }
        console.log(orderdetails);
        //to get email addr and phone number
        phone = req.body.phone; 
        var email = req.body.email;

        var user = await User.findOne({id:printcart.owner});

        ordermessage += await sendemail(email, orderdetails); 
        console.log("\nAfter email, the message is ", ordermessage);

        ordermessage += await sendtext(phone, orderdetails);
        console.log("\nAfter text, Printing order message to be returned to browser ", ordermessage);

        await Order.create({
            owner: user.id,
            cart: printcart.id});
            
        await Shoppingcart.destroy({
            id: printcart.id
        });
        console.log("Final message ", ordermessage);

        res.send(ordermessage);
    }
};

