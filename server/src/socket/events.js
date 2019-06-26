const dataHelpers = require('../util/data_helpers/data-helpers');

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
    socket.emit('message', message);
  })
};

// ----------------------------------------------
//              CARD EVENTS
// ----------------------------------------------

const request_connection = function(user_id){
  const socket = this;
  const client_id = socket.id
  console.log(`${client_id} requested a connection with ${user_id}`)
};

const accept_connection = function(user_id){
  const socket = this;
  const client_id = socket.id
  console.log(`${client_id} accepted a connection with ${user_id}`)
};

const ignore_connection = function(user_id){
  const socket = this;
  const client_id = socket.id
  console.log(`${client_id} ignored a connection with ${user_id}`)
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