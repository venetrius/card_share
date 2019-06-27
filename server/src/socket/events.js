const dataHelpers = require('../util/data_helpers/data-helpers');


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
        console.log('else', list)
        message = list[0];
      }
    }
    socket.emit('connection_change', JSON.stringify(message));
  }
  return connectionChangeCb;
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

const send_contact = function(user_id){
  const socket = this;
  const client_id = socket.id
  console.log(`${client_id} sent contact to ${user_id}`)
};

const save_contact = function(user_id){
  const socket = this;
  const client_id = socket.id
  console.log(`${client_id} saved contact of ${user_id}`)
};

const delete_contact = function(user_id){
  const socket = this;
  const client_id = socket.id
  console.log(`${client_id} deleted contact of ${user_id}`)
};


// ----------------------------------------------
//              Exports Module
// ----------------------------------------------

  module.exports = {
    get_categories,
    get_user,
    get_attendees,
    request_connection,
    accept_connection,
    ignore_connection,
    send_contact,
    save_contact,
    delete_contact
  };