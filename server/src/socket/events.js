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

  module.exports = {
    get_categories,
    get_user,
    get_attendees
  };