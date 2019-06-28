module.exports = function(App) {
  return {

    getUser(){
      App.state.connection.emit('get_user','1000001');
    },
  
    connectWith(user_id){
      App.state.connection.emit('request_connection',user_id);
    },
  
    getCategories(){
      App.state.connection.emit('get_categories','1000001');
    },
  
    getAttendees(){
      App.state.connection.emit('get_attendees',1000001);
    },
  
    requestConnection(){
      App.state.connection.emit('request_connection', 6);
    },
    
    acceptConnection(){
      App.state.connection.emit('accept_connection',1000001);
    },
  
    ignoreConnection(){
      App.state.connection.emit('ignore_connection', 7);
    },
  
    sendCard(){
      this.state.connection.emit('send_card', 6);
    },
    
    saveCard(){
      this.state.connection.emit('save_card', 7);
    },
  
    deleteCard(){
      this.state.connection.emit('delete_card', 6);
    },
  
    logOut(){
      this.state.connection.emit('log_out','');
    },
  
    showNotifications(){
      this.setState({ modalShow: true });
    }
  }
}