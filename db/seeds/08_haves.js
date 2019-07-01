
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('haves').del()
      .then(function () {
        // Inserts seed entries
        return knex('haves').insert([
          {id: 1000001, attendee_id: 1000001,  sub_category_id: 1000001},
          {id: 1000002, attendee_id: 1000001,  sub_category_id: 1000002},
          {id: 1000003, attendee_id: 1000001,  sub_category_id: 1000003},
          {id: 1000004, attendee_id: 1000001,  sub_category_id: 1000004},
          {id: 1000005, attendee_id: 1000001,  sub_category_id: 1000005},

          {id: 1000007, attendee_id: 1000002,  sub_category_id: 1000011},
          {id: 1000008, attendee_id: 1000002,  sub_category_id: 1000012},
          {id: 1000010, attendee_id: 1000002,  sub_category_id: 1000013},
          {id: 1000011, attendee_id: 1000002,  sub_category_id: 1000014},
          {id: 1000012, attendee_id: 1000002,  sub_category_id: 1000015},

          {id: 1000013, attendee_id: 1000003,  sub_category_id: 1000001},
          {id: 1000014, attendee_id: 1000003,  sub_category_id: 1000014},
          {id: 1000015, attendee_id: 1000003,  sub_category_id: 1000003},
          {id: 1000016, attendee_id: 1000003,  sub_category_id: 1000004},
          {id: 1000017, attendee_id: 1000003,  sub_category_id: 1000023},
          
        ]);
      });
  };