'use strict'
require('dotenv').config()
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  TEST: '"Fixed in dev.env js file"',
  VUE_APP_API: '"http://localhost:1337"'
})
