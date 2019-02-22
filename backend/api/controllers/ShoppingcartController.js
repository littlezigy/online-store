/**
 * ShoppingcartController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
*/

//So if a user is logged in, save their cart objects to their cart. 
//Else, save cart products to a session cookie

module.exports = {
    //post product id to cart
    addtocart: async function(req, res) {
        console.log("\n*************Add to cart***********\n************************************************");
        var cartitem = await Products.findOne({where: {id: req.body.productid}});

        //console.log("Checking that user " + req.session.user.id + " is logged in: " + req.session.user.loggedin);

        if(req.session.user) {
            console.log("Session userid " + req.session.user.id + "exists!");
            var user = await User.findOne({id:req.session.user.id}).populate('cart');
            var usercart = user.cart[0];
            var createnewproductinstance = 1;
            var product = await Products.findOne({id: req.body.productid});
            console.log("Product details ", product);
            console.log("User found. Has cart?\n", user.cart);
            
            //if shopping cart doesn't exist for user, create one.
            if (usercart == null || usercart == false) {
                console.log("User doesn't have a cart");
                //create a new shopping cart record and link it to this user.
                usercart = await Shoppingcart.create({
                    owner: req.session.user.id
                }).fetch(); 
                console.log("\nNew cart created! ", usercart);
            }
            console.log('Adding to cart...', usercart, '\nUser cart id: ', usercart.id);

            //--------------------Create new instance of product-------------------------------

            var cartitem = await Productitem.findOrCreate({
                where: {
                    cart: usercart.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    brand: product.brand
                }
            }, {
                cart: usercart.id,
                name: product.name,
                description: product.description,
                price: product.price,
                brand: product.brand,
                picid: product.productid
            });
            console.log('Item quantity: ', cartitem.quantity);
            cartitem.quantity++;

            await Productitem.update({id: cartitem.id}).set(
                {quantity: cartitem.quantity}
            )
            res.send({id: usercart.id});

        } else{
            if (req.session.cart === undefined || req.session.cart === null) { 
                console.log("No cart");
                req.session.cart = []; 
            }
            req.session.cart.push(req.body.productid);
            console.log('Cart now exists. ', req.session.cart);
            res.send(req.session.cart)
            console.log("Stored session cart");
        }
    },

    getcartid: async function(req, res) {
        //request is user id
        if(req.session.user) {
            console.log("-----------------------------Initiating server contact------------------------------------\nSession userid " + req.session.user.id + "exists!");
            var user = await User.findOne({id:req.session.user.id}).populate('cart');
            var usercart = user.cart[0];
            console.log("User found. Has cart?\n", user.cart);
            console.log("User cart id: ", usercart.id);
            
            res.send({id: usercart.id});
        } else {
            console.log("User not logged in");
            res.send("User not logged in");
        }
    }
};