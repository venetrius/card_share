
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('sub_categories').del()
      .then(function () {
        // Inserts seed entries
        return knex('sub_categories').insert([
          {id: 1000001, category_id: 1000001,  name:'Information'},
          {id: 1000002, category_id: 1000001,  name:'Student Experience'},
          {id: 1000003, category_id: 1000001,  name:'Mentor Experience'},
          
          {id: 1000004, category_id: 1000002,  name:'UX/UI'},
          {id: 1000005, category_id: 1000002,  name:'Backend Systems'},
          {id: 1000006, category_id: 1000002,  name:'Analytics'},
          {id: 1000007, category_id: 1000002,  name:'Debugging'},
          {id: 1000008, category_id: 1000002,  name:'Clean Code'},

          {id: 1000009, category_id: 1000003,  name:'Leadership'},
          {id: 1000010, category_id: 1000003,  name:'Public Speaking'},
          {id: 1000011, category_id: 1000003,  name:'Problem Solving'},
          {id: 1000012, category_id: 1000003,  name:'Project Management'},

          {id: 1000013, category_id: 1000004,  name:'Senior Mentorship'},
          {id: 1000014, category_id: 1000004,  name:'Professional Growth'},
          {id: 1000015, category_id: 1000004,  name:'Workplace Socials'},
          {id: 1000016, category_id: 1000004,  name:'Flexible Schedule'},
          {id: 1000017, category_id: 1000004,  name:'Casual Dress Code'},
          {id: 1000018, category_id: 1000004,  name:'Bike Storage'},
          {id: 1000019, category_id: 1000004,  name:'Trendy Office'},

          {id: 1000020, category_id: 1000005,  name:'Sports'},
          {id: 1000021, category_id: 1000005,  name:'Video Games'},
          {id: 1000022, category_id: 1000005,  name:'Baking'},
          {id: 1000023, category_id: 1000005,  name:'Board Games'},
          {id: 1000024, category_id: 1000005,  name:'Beer/Wine'},
          {id: 1000025, category_id: 1000005,  name:'Hugs'},
          
        ]);
      });
  };