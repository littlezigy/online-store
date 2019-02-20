/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true,
      unique: false
    }, 
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    phonenumber: {
      type: 'string',
      defaultsTo: '+234000000000'
    },
    //relationships
    userlevel: {
      model: 'usertype'
    },
    cart: {
      collection: 'shoppingcart',
      via: 'owner'
    },
    orders: {
      collection: 'order',
      via: 'owner'
    }
  }
};

