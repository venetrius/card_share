const dataHelpers = require('../util/data_helpers/data-helpers');


module.exports = function (io, model){

/********************
 * HELPER FUNCTIONS *
 ********************/
const getConnectionChangeCb = function(socket, requester_id){
  const connectionChangeCb = function(err, list){
    let message;
    if(err){
      console.log(err);
      message = {error : 'error please try again later'};
    }else{
      if(!list || list.length == 0){
        message = {error : 'There is no pending connection between the client and ' + requester_id};
      }
      else{
        message = list[0];
      }
    }
    socket.emit('connection_change', JSON.stringify(message));
  }
  return connectionChangeCb;
}

const getCardShareChangeCb = function(socket, sender_id){
  const cardShareChangeCb = function(err, list){
    let message;
    if(err){
      console.log(err);
      message = {error : 'error please try again later'};
    }else{
      if(!list || list.length == 0){
        message = {error : 'There is no pending card from ' + sender_id};
      }
      else{
        message = list[0];
      }
    }
    socket.emit('cardshare_change', JSON.stringify(message));
  }
  return cardShareChangeCb;
}

const sendNotificationIfOnline = function(attendeeID, messageType, message){
  const targetSocketID = model.retriveUser(attendeeID);
  if(targetSocketID){
    if(io.in(targetSocketID)){
      io.in(targetSocketID).emit(messageType, message);
    }
  }
}

/**
 * 
 */
const get_categories =  function(event_id){
  const socket = this;
  dataHelpers.getCategories(event_id,function(err, categories){
    let message;
    if(err){
      message = 'error please try again later';
    }else{
      message = JSON.stringify(categories);
    }
    socket.emit('categories', message);
  })
};

const get_user = function(id){
  const socket = this;
  dataHelpers.getUserById(id,function(err, profile){
    let message;
    if(err){
      message = 'error please try again later';
    }else{
      message = JSON.stringify(profile);
    }
    socket.emit('user', message);
  })
};


const get_attendees = function(id) {
  const socket = this;
  dataHelpers.getAttendees(id,function(err, list){
    let message;
    if(err){
      message = 'error please try again later';
    }else{
      message = JSON.stringify(list);
    }
    socket.emit('attendees', message);
  })
};

// ----------------------------------------------
//              CARD EVENTS
// ----------------------------------------------

const request_connection = function(message){
  const socket = this;
  const {requester_id, responder_id} =  message;
  dataHelpers.createConnectionIfNotExist(requester_id, responder_id,function(err, list){
    let message;
    if(err){
      console.log(err);
      message = 'error please try again later';
    }else{
      message = JSON.stringify(list[0]);
    }
    sendNotificationIfOnline(responder_id, 'connection_change', message);
    socket.emit('connection_change', message);
  })
};

const accept_connection = function(incoming_message){
  const socket = this;
  const {requester_id, responder_id} =  incoming_message;
  dataHelpers.changeConnectionStatus(requester_id, responder_id, 'CONNECTED', getConnectionChangeCb(this, requester_id))
};

const ignore_connection = function(incoming_message){
  const socket = this;
  const {requester_id, responder_id} =  incoming_message;
  dataHelpers.changeConnectionStatus(requester_id, responder_id, 'DECLINED', getConnectionChangeCb(socket, requester_id))
};


const send_card = function(message){
  const socket = this;
  const {sender_id, receiver_id} =  message;
  dataHelpers.createCardShareIfNotExist(sender_id, receiver_id,function(err, list){
    let message;
    if(err){
      console.log(err);
      message = 'error please try again later';
    }else if(list.error){
      message = JSON.stringify(list);
    }else{
      message = JSON.stringify(list[0]);
    }
    socket.emit('connection_change', message);
  })
};

const save_card = function(incoming_message){
  const socket = this;
  const {sender_id, receiver_id} =  incoming_message;
  dataHelpers.changeCardShareStatus(sender_id, receiver_id, 'SAVED', getCardShareChangeCb(this, sender_id))
};

const delete_card = function(incoming_message){
  const socket = this;
  const {sender_id, receiver_id} =  incoming_message;
  dataHelpers.changeCardShareStatus(sender_id, receiver_id, 'DISCARDED', getCardShareChangeCb(socket, sender_id))
};



// ----------------------------------------------
//              Exports Module
// ----------------------------------------------

  return {
    get_categories,
    get_user,
    get_attendees,
    request_connection,
    accept_connection,
    ignore_connection,
    send_card,
    save_card,
    delete_card
  };
}