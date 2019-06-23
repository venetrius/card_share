
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1000001, token : "f43vr432401", first_name: 'Bri',   last_name:'Brilast', email_address:'bri@gmail.com', 'linkedin-link':'https://www.linkedin.com'},
        {id: 1000002, token : "f43vr432402", first_name: 'Chri',  last_name:'Galast',  email_address:'ga@gmail.com',  'linkedin-link':'https://www.linkedin.com'},
        {id: 1000003, token : "f43vr432403", first_name: 'Gi',    last_name:'Gilast',  email_address:'gi@gmail.com',  'linkedin-link':'https://www.linkedin.com'}
      ]);
    });
};