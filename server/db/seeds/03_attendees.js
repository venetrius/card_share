
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('attendees').del()
    .then(function () {
      // Inserts seed entries
      return knex('attendees').insert([
        {event_id: 1000001, id: 1000001, user_id : 1000001, first_name: 'Bri',   last_name:'Brilast', email_address:'bri@gmail.com', 'linkedin-link':'https://www.linkedin.com', tagline: 'Who is this Bri, she is the greatest'},
        {event_id: 1000001, id: 1000002, user_id : 1000002, first_name: 'Chri',  last_name:'Chilast',  email_address:'ga@gmail.com',  'linkedin-link':'https://www.linkedin.com', tagline: 'Bri is cool'},
        {event_id: 1000001, id: 1000003, user_id : 1000003, first_name: 'Gi',    last_name:'Gilast',  email_address:'gi@gmail.com',  'linkedin-link':'https://www.linkedin.com', tagline: 'Bri is a good cyclist'}
      ]);
    });
};