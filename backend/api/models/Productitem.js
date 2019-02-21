module.exports = {
    attributes: {
        name: 'string',
        description: 'string',
        price: 'string',
        brand: 'string',
        quantity: {
            type: 'number',
            defaultsTo: 0
        },
        picid: 'number',
        cart: {
            model: 'shoppingcart'
        }
    }
}