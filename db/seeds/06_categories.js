
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('categories').del()
      .then(function () {
        // Inserts seed entries
        return knex('categories').insert([
          {id: 1000001, event_id: 1000001,  name:'Lighthouse Labs'},
          {id: 1000002, event_id: 1000001,  name:'Technical Skills'},
          {id: 1000003, event_id: 1000001,  name:'Soft Skills'},
          {id: 1000004, event_id: 1000001,  name:'Work Culture'},
          {id: 1000005, event_id: 1000001,  name:'Fun'}
        ]);
      });
  };