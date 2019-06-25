require('dotenv').config();

const knex = require('knex')({
    client: 'pg',
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
      ssl      : process.env.DB_SSL
    }
});

const category_helpers = require('./data-helpers-categories')(knex);
const user_helpers = require('./data-helpers-users')(knex);
let dataHelpers = Object.assign(user_helpers, category_helpers);
module.exports = dataHelpers;