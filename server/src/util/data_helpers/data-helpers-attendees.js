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

  // Connections 

  function getConnection(requester_id, responder_id, cb){
    knex.select('*')
    .from('connections')
    .where(function() {
      this.where('requester_id', requester_id)
      .andWhere('responder_id', responder_id)
    })
    .orWhere(function() {
      this.where('requester_id', responder_id)
      .andWhere('responder_id', requester_id) 
    })
    .asCallback(cb)
  }

  function createConnection(requester_id, responder_id, cb) {
    knex('connections')
    .insert([{requester_id : requester_id, responder_id : responder_id, event_id:           1000001,  status:'SENT'}])
    .returning('id')
    .asCallback(cb);
  }

  function createConnectionIfNotExist(requester_id, responder_id, cb){
    getConnection(requester_id, responder_id, 
      function(err, connection){
        if(err){
          cb(err,null);
        }if(connection && connection.length > 0){
          cb(null, {error : 'connection already exists'})
        }
        else{
          createConnection(requester_id, responder_id, cb)
        }
      }
    );
  }

  return {
    getAttendees,
    getConnection,
    createConnection,
    createConnectionIfNotExist
  }  
}



// Event ID needs to be added to the database!