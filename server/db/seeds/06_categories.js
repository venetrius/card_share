
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('categories').del()
      .then(function () {
        // Inserts seed entries
        return knex('categories').insert([
          {id: 1000001, event_id: 1000001,  name:'Software'},
          {id: 1000002, event_id: 1000001,  name:'Baking'},
          {id: 1000003, event_id: 1000001,  name:'Design'},
          {id: 1000004, event_id: 1000001,  name:'Hope'},
          {id: 1000005, event_id: 1000001,  name:'Dev_ops'}
        ]);
      });
  };