const dataHelpers = require('../util/data_helpers/data-helpers');


module.exports = function (io, model){

/********************
 * HELPER FUNCTIONS *
 ********************/
const applyConnection = function (connection, attendee_id, attendeesMap){
  const isISent = connection.requester_id === attendee_id;
  if(isISent){
    const conn = {
      sender : attendee_id,
      status : connection.status === 'CONNECTED' ?  'CONNECTED' : 'SENT'
    }
    attendeesMap[connection.responder_id].connection = conn;
  }else{
    const conn = {
      sender : connection.requester_id,
      status : connection.status
    }
    attendeesMap[connection.requester_id].connection = conn;
  }
  
}

const applyCardShares = function (cardShare, attendee_id, attendeesMap){
  const ifISent = cardShare.sender_id === attendee_id;
  if(ifISent){
    const cards = attendeesMap[cardShare.receiver_id].cards ? attendeesMap[cardShare.receiver_id].cards : {};
    cards.to = 'SENT';
    attendeesMap[cardShare.receiver_id].cards = cards;
  }else{
    const cards = attendeesMap[cardShare.sender_id].cards ? attendeesMap[cardShare.sender_id].cards : {};
    cards.from = cardShare.status;
    attendeesMap[cardShare.sender_id].cards = cards;
  }  
}

const getAccessLevel = function (attendee){
  let accessLevel = 'BASE'
  if(attendee.cards &&  attendee.cards.from && attendee.cards.from !== 'DISCARDED'){
    accessLevel = 'FULL'
  }
  else if(attendee.connection && attendee.connection.status === 'CONNECTED'){
    accessLevel = 'CONNECTION'
  }
  return accessLevel;
}

const deleteContactInfo = function (attendee){
  delete attendee.email_address;
  delete attendee.last_name;
  delete attendee.position;
  delete attendee.company;
  delete attendee['linkedin-link'];
}

const deleteLastNameAndPicture = function (attendee){
  delete attendee.first_name;
  delete attendee.photo;
}

const deleteAttributes = function (attendeesMap){
  for(attendeeId in attendeesMap){
    const attendee = attendeesMap[attendeeId];
    const accessLevel = getAccessLevel(attendee); 
    if(accessLevel === 'BASE'){
      deleteContactInfo(attendee);
      deleteLastNameAndPicture(attendee);
    }else if(accessLevel === "CONNECTION"){
      deleteContactInfo(attendee);
    }
    delete attendee.created_at;
    delete attendee.user_id;
    delete attendee.event_id;
    console.log('attende', attendee);
  }
}

const filterProfiles = function(attendee_id, attendees, relationships){
  const attendeesMap = {};
  attendees.forEach(attendee => {attendeesMap[attendee.id] = attendee});
  delete attendeesMap[attendee_id];
  relationships.connections.forEach(connection => applyConnection(connection, attendee_id, attendeesMap));
  relationships.cardShares.forEach(cardShare => applyCardShares(cardShare, attendee_id, attendeesMap));
  deleteAttributes(attendeesMap);
  return attendeesMap;
}

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


const get_attendees = function(messageIn) {
  const {event_id, attendee_id} =  messageIn;
  const socket = this;
  dataHelpers.getAttendees(event_id,function(err, attendees){
    let message;
    if(err){
      message = 'error please try again later';
      socket.emit('attendees', message);
    }else{
      dataHelpers.getRelationships(attendee_id,function(err, relationships){
       // console.log(relationships);
        const filteredAttendeProfiles = filterProfiles(attendee_id, attendees, relationships);
        socket.emit('attendees', JSON.stringify(filteredAttendeProfiles));

      })
    }

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