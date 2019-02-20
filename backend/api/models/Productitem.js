module.exports = {
    attributes: {
        name: 'string',
        description: 'string',
        price: 'string',
        brand: 'string',
        quantity: {
            type: 'number',
            defaultsTo: 1
        },
        cart: {
            model: 'shoppingcart'
        }
    }
}