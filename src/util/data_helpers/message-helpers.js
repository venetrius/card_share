const isValiedMessage = function(message){
  const {sender_id, receiver_id, event_id,  content} =  message;
  return (
    !isNaN(sender_id) &&
    !isNaN(receiver_id) &&
    !isNaN(event_id) &&
    content &&
    content.length > 0 &&
    content.length < 256 
  );
} 


module.exports = function(knex){

  // TODO it is a duplicate, export attandee helpers {should be in connection helpers}
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
    .first()
    .asCallback(cb)
  }

  function createMessage(message, cb) {
   if( !isValiedMessage(message)){
      return cb('not a valid message', null);
    }
    message.status = 'SENT'
    const {sender_id, receiver_id, event_id,  content, status} =  message;
    getConnection(sender_id, receiver_id, function(err, connection){
      if(err){
        cb(err, null)
      }else if(!connection || connection.status !== 'CONNECTED'){
        return cb('not a valid message, not CONNECTED', null);
      }else{
        knex('messages')
        .insert([{sender_id, receiver_id, event_id,  content, status}])
        .returning('*')
        .asCallback(function(err, messages){
          const message = messages ? messages[0] : null;
          cb(err, message)
        });
      }
    })
  }



  return {
    createMessage
  }  
}