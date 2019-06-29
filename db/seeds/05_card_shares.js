
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('card_shares').del()
    .then(function () {
      // Inserts seed entries
      return knex('card_shares').insert([
        {id: 1000001, sender_id : 1000001, receiver_id : 1000002, event_id: 1000001,  status:'PENDING'},
        {id: 1000002, sender_id : 1000002, receiver_id : 1000003, event_id: 1000001,  status:'PENDING'},
        {id: 1000003, sender_id : 1000003, receiver_id : 1000001, event_id: 1000001,  status:'PENDING'}
      ]);
    });
};