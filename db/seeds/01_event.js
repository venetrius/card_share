
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {
          id:         1000001,
          event_code: 'AAAA',
          name:       'Event The First',
          description:'Caching the deadline',
          city:       'Calgary',
          address:    '150 9 Ave SW, Calgary, AB T2P 3H9',
          start:      new Date('2019-06-18T03:24:00').toISOString(),
          end :       new Date('2019-07-03T01:00:00').toISOString()
       },       
      ]);
    });
};
