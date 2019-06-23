
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('connections').del()
    .then(function () {
      // Inserts seed entries
      return knex('connections').insert([
        {id: 1000001, requester_id : 1000001, responder_id : 1000002, event_id: 1000001,  status:'SENT'},
        {id: 1000002, requester_id : 1000002, responder_id : 1000003, event_id: 1000001,  status:'SENT'},
        {id: 1000003, requester_id : 1000003, responder_id : 1000001, event_id: 1000001,  status:'SENT'}
      ]);
    });
};