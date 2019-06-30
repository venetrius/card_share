const dataHelpers = require('../util/data_helpers/data-helpers');


module.exports = function (io, model){

/********************
 * HELPER FUNCTIONS *
 ********************/
const getBasicProfile = function(attendee){
  const {id, tagline} = attendee;
  return {id, tagline};
}

const applyConnection = function (connection, attendee_id, attendeesMap){
  const isISent = connection.requester_id === attendee_id;
  if(isISent){
    if(! attendeesMap[connection.responder_id]){
      // TODO only occour if sender == receiver
      console.log('error in applyConnection', connection);
      return;
    }
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
    if(! attendeesMap[cardShare.receiver_id]){
      // TODO only occour if sender == receiver
      console.log('error in applyCardShares', cardShare);
      return;
    }
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

const getConnectionChangeCb = function(socket, requester_id, isToForward){
  const connectionChangeCb = function(err, list){
    let message;
    if(err){
      message = {error : 'error please try again later'};
    }else{
      if(!list || list.length == 0){
        message = {error : 'There is no pending connection between the client and ' + requester_id};
      }
      else{
        message = list[0];
      }
    }
    if(isToForward){
      sendNotificationIfOnline(requester_id, 'connection_change', message);
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
  if(targetSocketID && message && ! message.error){
    if(io.in(targetSocketID)){
      io.in(targetSocketID).emit(messageType, JSON.stringify(message));
    }
  }
}

const loadAttendeeId = function(socket, event){
  let attendeeId;
  if(socket.handshake.session.type === 'attendee'){
    attendeeId =  socket.handshake.session[0].id;
  } 
  if( ! attendeeId) {
    socket.emit(event, JSON.stringify({error : 'unauthorized'}));
  }
  return attendeeId
}

const validateProfile = function(profile){
  const {email_adress, position, company, phone_number, photo, tagline}  = profile;
  return {email_adress, position, company, phone_number, photo, tagline};
}

const validateInterest = function(interest){
  let {haves, wants}  = interest;
  if(haves.length > 5){
    haves = haves.slice(0,5);
  }
  if(wants.length > 5){
    wants = want.slice(0,5);
  }
  return {haves, wants};
}
/*****************************************************************************-
 *                        EVENTS
 *****************************************************************************/
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
  const socket = this;
  const attendee_id = loadAttendeeId(socket, 'attendees');
  if( ! attendee_id) {return}
  const event_id =  messageIn;
  dataHelpers.getAttendees(event_id,function(err, attendees){
    let message;
    if(err){
      message = 'error please try again later';
      socket.emit('attendees', message);
    }else{
      dataHelpers.getRelationships(attendee_id,function(err, relationships){
        const filteredAttendeeProfiles = filterProfiles(attendee_id, attendees, relationships);
        socket.emit('attendees', JSON.stringify(filteredAttendeeProfiles));

      })
    }

  })
};


const get_attendee = function() {
  const socket = this;
  const attendee_id = loadAttendeeId(socket, 'attendee');
  if( ! attendee_id) {return}
  dataHelpers.getAttendeeById(attendee_id,function(err, attendee){
    let message;
    if(err || ! attendee){
      message = {error : 'error please try again later'};
    }else{
      message = attendee;
    }
    socket.emit('attendee', JSON.stringify(message));
  })
};

const update_profile = function(msg) {
  const socket = this;
  const attendee_id = loadAttendeeId(socket, 'attendee');
  if( ! attendee_id) {return}
  const profile = validateProfile(JSON.parse(msg));
  dataHelpers.updateAttendeeById(attendee_id, profile, function(err, attendee){
    let message;
    if(err || ! attendee){
      message = {error : 'error please try again later'};
    }else{
      message = attendee;
      model.broadcast(io, 'broadcast_attendee', getBasicProfile(attendee[0]), attendee.id);
    }
    socket.emit('attendee', JSON.stringify(message));
  })
};

const update_interests = function(msg) {
  console.log('received', msg)
  const socket = this;
  const attendee_id = loadAttendeeId(socket, 'attendee');
  if( ! attendee_id) {return}
  const interests = validateInterest(JSON.parse(msg));
  dataHelpers.updateInterestsById(attendee_id, interests, function(err, updatedInterests){
    let message;
    if(err || ! updatedInterests){
      console.log('error in update_interests', err)
      message = {error : 'error please try again later'};
    }else{
      const haves = updatedInterests.haves.map(haveObj => haveObj.sub_category_id)
      const wants = updatedInterests.wants.map(wantObj => wantObj.sub_category_id)
      message = { haves, wants}
      model.broadcast(io, 'broadcast_interests', {...message, id : attendee_id}, attendee_id);
      console.log("Message: ", message)
    }
    socket.emit('attendee_interests', JSON.stringify(message));
  })
};



// ----------------------------------------------
//              CARD EVENTS
// ----------------------------------------------

const request_connection = function(message){
  const socket = this;
  const requester_id = loadAttendeeId(socket, 'connection_change');
  if( ! requester_id) {return}
  const responder_id =  message;
  dataHelpers.createConnectionIfNotExist(requester_id, responder_id,function(err, connections){
    let message;
    if(err){
      console.log(err);
      message = {error : 'please try again later'}
    }else{
      message = connections;
    }
    sendNotificationIfOnline(responder_id, 'connection_change', message);
    socket.emit('connection_change',  JSON.stringify(message));
  })
};

const accept_connection = function(incoming_message){
  const socket = this;
  const responder_id = loadAttendeeId(socket, 'connection_change');
  if( ! responder_id) {return}
  const requester_id =  incoming_message;
  const forward = {estination: requester_id}
  dataHelpers.changeConnectionStatus(requester_id, responder_id,
     'CONNECTED', getConnectionChangeCb(this, requester_id, true))
};

const ignore_connection = function(incoming_message){
  const socket = this;
  const responder_id = loadAttendeeId(socket, 'connection_change');
  if( ! responder_id) {return}
  const requester_id =  incoming_message;
  dataHelpers.changeConnectionStatus(requester_id, responder_id,
     'DECLINED', getConnectionChangeCb(socket, requester_id, false))
};

const send_card = function(message){
  const socket = this;
  const sender_id = loadAttendeeId(socket, 'connection_change');
  if( ! sender_id) {return}
  const receiver_id =  message;
  dataHelpers.createCardShareIfNotExist(sender_id, receiver_id, function(err, cardShare){
    let message;
    if(err){
      console.log(err);
      message = 'error please try again later';
    }else{
      message = cardShare;
    }
    sendNotificationIfOnline(receiver_id, 'cardshare_change', message);
    socket.emit('cardshare_change', JSON.stringify(message));
  })
};

const save_card = function(incoming_message){
  const socket = this;
  const receiver_id = loadAttendeeId(socket, 'connection_change');
  if( ! receiver_id) {return}
  const sender_id =  incoming_message;
  dataHelpers.changeCardShareStatus(sender_id, receiver_id, 'SAVED', getCardShareChangeCb(this, sender_id))
};

const delete_card = function(incoming_message){
  const socket = this;
  const receiver_id = loadAttendeeId(socket, 'connection_change');
  if( ! receiver_id) {return}
  const sender_id =  incoming_message;
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
    delete_card,
    get_attendee,
    update_profile,
    update_interests
  };
}