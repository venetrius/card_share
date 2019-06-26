module.exports = function(knex){
  function getAttendees(event_id, cb) {
    knex.select(
      'attendees.*',
      knex.raw('json_agg(haves.sub_category_id) as haves'),
      knex.raw('json_agg(wants.sub_category_id) as wants')
    )
    .from('attendees')
    .leftJoin('haves', 'haves.attendee_id', 'attendees.id')
    .groupByRaw('attendees.id')
    .leftJoin('wants', 'wants.attendee_id', 'attendees.id')
    .groupByRaw('attendees.id')
    .where('event_id', event_id)

    .asCallback(function(err, attendees) 
      {
        if (err) {
          throw err;
        }
        for(let attendee of attendees){
          let hash = {};
          attendee.haves.forEach(entry => hash[entry] = entry);
          attendee.haves = Object.keys(hash);
          hash = {};
          attendee.wants.forEach(entry => hash[entry] = entry);
          attendee.wants = Object.keys(hash);
        }
        cb(null, attendees)
      }
    );
  }

  return {
    getAttendees
  }  
}



// Event ID needs to be added to the database!