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
const attendee_helpers = require('./data-helpers-attendees')(knex);
let dataHelpers = Object.assign(user_helpers, category_helpers, attendee_helpers);
module.exports = dataHelpers;