module.exports = function(knex){
  function getAttendees(event_id, cb) {
    knex.select('*').from('attendees')
      .asCallback(function(err, attendees) 
      {
        if (err) {
          throw err;
        }
        cb(null, attendees)
      }
    );
  }

  return {
    getAttendees
  }  
}

// .leftJoin('haves', 'haves.user_id', 'attendees.user_id')
// .leftJoin('wants', 'wants.user_id', 'attendees.user_id')
// .where('event_id', event_id)

// Event ID needs to be added to the database!