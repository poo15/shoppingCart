const route = require('express').Router()

route.use('/users', require('./users'))

route.use('/products', require('./products'))

route.use('/vendors', require('./vendors'))

route.use('/carts', require('./carts'))

exports = module.exports = {
    route
}