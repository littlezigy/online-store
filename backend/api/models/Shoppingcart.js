/**
 * Shoppingcart.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
//product many to many 
//user one to many
  attributes: {
    product: {
      collection: 'productitem',
      via: 'cart'
    },
    owner: {
      model: 'user'
      //unique: true
    }
  }
};