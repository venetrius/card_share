
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('wants').del()
      .then(function () {
        // Inserts seed entries
        return knex('wants').insert([
          {id: 1000001, user_id: 1000001,  sub_category_id: 1000002},
          {id: 1000002, user_id: 1000001,  sub_category_id: 1000005},
          {id: 1000003, user_id: 1000001,  sub_category_id: 1000007},
          {id: 1000004, user_id: 1000001,  sub_category_id: 1000014},
          {id: 1000005, user_id: 1000001,  sub_category_id: 1000020},


          {id: 1000006, user_id: 1000002,  sub_category_id: 1000006},
          {id: 1000007, user_id: 1000002,  sub_category_id: 1000010},
          {id: 1000008, user_id: 1000002,  sub_category_id: 1000011},
          {id: 1000010, user_id: 1000002,  sub_category_id: 1000012},
          {id: 1000011, user_id: 1000002,  sub_category_id: 1000018},
          {id: 1000012, user_id: 1000002,  sub_category_id: 1000019},

          {id: 1000012, user_id: 1000003,  sub_category_id: 1000001},
          {id: 1000013, user_id: 1000003,  sub_category_id: 1000008},
          {id: 1000014, user_id: 1000003,  sub_category_id: 1000010},
          {id: 1000015, user_id: 1000003,  sub_category_id: 1000016},
          {id: 1000016, user_id: 1000003,  sub_category_id: 1000019},
          {id: 1000017, user_id: 1000003,  sub_category_id: 1000023},          
        ]);
      });
  };