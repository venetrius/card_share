exports.up = function(knex, Promise) {
  return knex.schema

  .createTable('events', function (table) {
    table.increments('id').primary()
    table.string('event_code',255).notNullable().unique()
    table.string('name', 255).notNullable()
    table.string('description', 1023).notNullable()
    table.string('city', 255).notNullable()
    table.string('address', 511).notNullable()
    table.timestamp('start').notNullable()
    table.timestamp('end').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })

  .createTable('users', function (table) {
    table.increments('id').primary()
    table.string('email_address', 255)
    table.string('photo', 255)
    table.string('token', 255).notNullable()
    table.string('first_name', 255).notNullable()
    table.string('last_name', 255)
    table.string('phone_number', 255)
    table.string('position', 255)
    table.string('company', 255)
    table.string('linkedin-link', 255).notNullable()
    table.string('tagline ', 255)
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })

  .createTable('attendees', function (table) {
    table.increments('id').primary()
    table.integer('user_id')
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.integer('event_id')
    table.foreign('event_id').references('events.id').onDelete('CASCADE')
    table.string('email_address', 255)
    table.string('photo', 255)
    table.string('first_name', 255).notNullable()
    table.string('last_name', 255)
    table.string('phone_number', 255)
    table.string('position', 255)
    table.string('company', 255)
    table.string('linkedin-link', 255).notNullable()
    table.string('tagline ', 255)
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })

  .createTable('organizers', function (table) {
    table.increments('id').primary()
    table.integer('user_id')
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.integer('event_id')
    table.foreign('event_id').references('events.id').onDelete('CASCADE')
  })

  .createTable('card_shares', function (table) {
    table.increments('id').primary()
    table.integer('sender_id')
    table.foreign('sender_id').references('attendees.id').onDelete('CASCADE')
    table.integer('receiver_id')
    table.foreign('receiver_id').references('attendees.id').onDelete('CASCADE')
    table.integer('event_id')
    table.foreign('event_id').references('events.id').onDelete('CASCADE')
    table.string('status', 10).notNullable()
  })

  .createTable('messages', function (table) {
    table.increments('id').primary()
    table.integer('sender_id')
    table.foreign('sender_id').references('attendees.id').onDelete('CASCADE')
    table.integer('receiver_id')
    table.foreign('receiver_id').references('attendees.id').onDelete('CASCADE')
    table.integer('event_id')
    table.foreign('event_id').references('events.id').onDelete('CASCADE')
    table.string('content', 255).notNullable()
    table.string('status', 10).notNullable()
    table.timestamp('end').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })

  .createTable('connections', function (table) {
    table.increments('id').primary()
    table.integer('requester_id')
    table.foreign('requester_id').references('attendees.id').onDelete('CASCADE')
    table.integer('responder_id')
    table.foreign('responder_id').references('attendees.id').onDelete('CASCADE')
    table.integer('event_id')
    table.foreign('event_id').references('events.id').onDelete('CASCADE')
    table.string('status', 10).notNullable()
  })

  .createTable('categories', function (table) {
    table.increments('id').primary()
    table.string('name', 255).notNullable()
    table.integer('event_id')
    table.foreign('event_id').references('events.id').onDelete('CASCADE')
  })

  .createTable('sub_categories', function (table) {
    table.increments('id').primary()
    table.string('name', 255).notNullable()
    table.integer('category_id')
    table.foreign('category_id').references('categories.id').onDelete('CASCADE')
  })

  .createTable('haves', function (table) {
    table.increments('id').primary()
    table.integer('attendee_id')
    table.foreign('attendee_id').references('attendees.id').onDelete('CASCADE')
    table.integer('sub_category_id')
    table.foreign('sub_category_id').references('sub_categories.id').onDelete('CASCADE')
  })

  .createTable('wants', function (table) {
    table.increments('id').primary()
    table.integer('attendee_id')
    table.foreign('attendee_id').references('attendees.id').onDelete('CASCADE')
    table.integer('sub_category_id')
    table.foreign('sub_category_id').references('sub_categories.id').onDelete('CASCADE')
  })

};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('messages')
  .dropTable('haves')
  .dropTable('wants') 
  .dropTable('sub_categories')
  .dropTable('categories')  
  .dropTable('connections')
  .dropTable('card_shares')
  .dropTable('organizers')
  .dropTable('attendees')
  .dropTable('events')
  .dropTable('users')
};
