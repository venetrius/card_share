module.exports = function(knex){

  function getAttendeeByUserAndEvent(user_id, event_id, cb){
    knex.select('*')
    .from('attendees')
    .where('user_id', user_id)
    .andWhere('event_id', event_id)
    .asCallback(cb)
  }

  function getAttendeeById(attendee_id, cb){
    knex.select('*')
    .from('attendees')
    .where('id', attendee_id)
    .first()
    .asCallback(cb)
  }

  function createAttendee(profile, cb) {
    knex('attendees')
    .insert([profile])
    .returning('*')
    .asCallback(cb);
  }

  function findOrCreateAttendee(user_id, event_id, profile, cb){
    getAttendeeByUserAndEvent(user_id, event_id, 
      function(err, attendee){
        if(err){
          cb(err,null);
        }if(attendee && attendee.length > 0){
          cb(null, attendee)
        }
        else{
          createAttendee(profile, cb)
        }
      }
    );
  }
  function getConnections(attendee_id, cb){
    knex.select('*')
    .from('connections')
    .where('requester_id', attendee_id)
    .orWhere('responder_id', attendee_id) 
    .asCallback(cb)
  }

  function getCardShares(attendee_id, cb){
    knex.select('*')
    .from('card_shares')
    .where('sender_id', attendee_id)
    .orWhere('receiver_id', attendee_id) 
    .asCallback(cb)
  }

  function getRelationships(attendee_id, cb){
    getConnections(attendee_id, 
      function(err, connections){
        if(err){
          cb(err, null);
        }else{
          getCardShares(attendee_id, function(err, cardShares){
            cb(err, {connections, cardShares});
          })
        }
      }
    )
  }

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
    .insert([{requester_id : requester_id, responder_id : responder_id, event_id: 1000001,  status:'SENT'}])
    .returning('*')
    .asCallback(cb);
  }

  function changeConnectionStatus(requester_id, responder_id, status, cb){
    knex('connections')
    .where('requester_id', requester_id)
    .andWhere('responder_id', responder_id)
    .andWhere('status', "SENT")
    .update({status})
    .returning('*')
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
          createConnection(requester_id, responder_id, (err, conn) =>  cb(err,conn[0]))
        }
      }
    );
  }

  function getCardShare(sender_id, receiver_id, cb){
    knex.select('*')
    .from('card_shares')
    .where('sender_id', sender_id)
    .andWhere('receiver_id', receiver_id)
    .asCallback(cb)
  }

  function createCardShare(sender_id, receiver_id, cb) {
    knex('card_shares')
    .insert([{sender_id : sender_id, receiver_id : receiver_id, event_id: 1000001,  status:'PENDING'}])
    .returning('*')
    .asCallback(cb);
  }

  function changeCardShareStatus(sender_id, receiver_id, status, cb){
    knex('card_shares')
    .where('sender_id', sender_id)
    .andWhere('receiver_id', receiver_id)
    .andWhere('status', "PENDING")
    .update({status})
    .returning('*')
    .asCallback(cb);
  }

  function createCardShareIfNotExist(sender_id, receiver_id, cb){
    getCardShare(sender_id, receiver_id, 
      function(err, cardShares){
        if(err){
          cb(err,null);
        }if(cardShares && cardShares.length > 0){
          cb(null, {error : 'card shares already exists'})
        }
        else{
          createCardShare(sender_id, receiver_id, (err, cards) => cb(err,cards[0]));
        }
      }
    );
  }


  return {
    getAttendees,
    getConnection,
    createConnection,
    createConnectionIfNotExist,
    changeConnectionStatus,
    createCardShareIfNotExist,
    changeCardShareStatus,
    findOrCreateAttendee,
    getRelationships,
    getAttendeeById
  }  
}



// Event ID needs to be added to the database!