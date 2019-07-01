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

  function createMessage(message, cb) {
   if( !isValiedMessage(message)){
      return cb('not a valid message', null);
    }
    message.status = 'SENT'
    const {sender_id, receiver_id, event_id,  content, status} =  message;
    knex('messages')
    .insert([{sender_id, receiver_id, event_id,  content, status}])
    .returning('*')
    .asCallback(function(err, messages){
      const message = messages ? messages[0] : null;
      cb(err, message)
    });
  }



  return {
    createMessage
  }  
}