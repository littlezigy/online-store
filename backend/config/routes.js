/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
    'post /user/login': 'UserController.login',
    'get /user/logout': 'UserController.logout',
    'post /admin/login': 'UserController.adminlogin',
    'post /addtocart': 'ShoppingcartController.addtocart',
    'post /sendsms': {action: 'send-sms'},
    'get /getcartid': 'ShoppingcartController.getcartid',
    'post /sendmail': {action: 'send-mail'},
    'get /test': {action: 'test-env'},
    'post /neworder': 'OrderController.neworder'
};
 