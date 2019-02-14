/**
 * Products.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    description: {
      type: 'string',
      required: true
    },
    price: {
      type: 'number',
      required: true
    },
    brand: 'string',
    quantity: 'number',
    
    //relationships
    category: {
      model: 'productcategory'
    },
    carts: {
      collection: 'shoppingcart',
      via: 'product'
    }
  }
};

