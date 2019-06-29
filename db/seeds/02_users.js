
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1000001, token : "f43vr432401", first_name: 'Bri',   last_name:'Brilast', photo: 'https://images-na.ssl-images-amazon.com/images/I/717aCo7EHVL._SX425_.jpg', email_address:'bri@gmail.com', 'linkedin-link':'https://www.linkedin.com'},
        {id: 1000002, token : "f43vr432402", first_name: 'Chri',  last_name:'Galast',  photo: 'https://www.electricferret.com/static/images/cbub/cbub_contender_image/8/2590/2590.jpg', email_address:'ga@gmail.com',  'linkedin-link':'https://www.linkedin.com'},
        {id: 1000003, token : "f43vr432403", first_name: 'Gi',    last_name:'Gilast',  photo: 'https://pbs.twimg.com/profile_images/725688891974504448/GiVaKByE.jpg', email_address:'gi@gmail.com',  'linkedin-link':'https://www.linkedin.com'}
      ]);
    });
};