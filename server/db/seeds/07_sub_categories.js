
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('sub_categories').del()
      .then(function () {
        // Inserts seed entries
        return knex('sub_categories').insert([
          {id: 1000001, category_id: 1000001,  name:'JavaScript'},
          {id: 1000002, category_id: 1000001,  name:'Java'},
          {id: 1000003, category_id: 1000001,  name:'Python'},
          {id: 1000004, category_id: 1000001,  name:'Ruby'},
          {id: 1000005, category_id: 1000001,  name:'C#'},


          {id: 1000006, category_id: 1000002,  name:'Bread'},
          {id: 1000007, category_id: 1000002,  name:'Pasta'},
          {id: 1000008, category_id: 1000002,  name:'Bagel'},
          {id: 1000010, category_id: 1000002,  name:'Cake'},
          {id: 1000011, category_id: 1000002,  name:'Chicke'},
          {id: 1000012, category_id: 1000002,  name:'GummyBear'},

          {id: 1000012, category_id: 1000003,  name:'CSS'},
          {id: 1000013, category_id: 1000003,  name:'Responsive design'},
          {id: 1000014, category_id: 1000003,  name:'Duck pages'},
          {id: 1000015, category_id: 1000003,  name:'3D modelling'},
          {id: 1000016, category_id: 1000003,  name:'Fashion'},
          {id: 1000017, category_id: 1000003,  name:'Car design'},


          {id: 1000018, category_id: 1000004,  name:'Fortune telling'},
          {id: 1000019, category_id: 1000004,  name:'Optimistic'},
          {id: 1000020, category_id: 1000004,  name:'Unatural Ductivities'},
          {id: 1000021, category_id: 1000004,  name:'Positive Attitude'},

          {id: 1000022, category_id: 1000001,  name:'Automated testing'},
          {id: 1000022, category_id: 1000001,  name:'Continous development'},
          {id: 1000022, category_id: 1000001,  name:'Dockers'},
          {id: 1000022, category_id: 1000001,  name:'Kebernetees'},
          {id: 1000022, category_id: 1000001,  name:'Other magic word'}
          
        ]);
      });
  };