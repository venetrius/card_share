module.exports = function(App) {
  return {

    initData(){
      this.getUser();
      this.getCategories();
      this.getAttendees();
    },

    getUser(){
      App.state.connection.emit('get_user','1000001');
    },

    getAttendee(){
      App.state.connection.emit('get_attendee','');
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
  
    requestConnection(attendee_id){
      App.state.connection.emit('request_connection', attendee_id);
    },
    
    acceptConnection(attendee_id){
      App.state.connection.emit('accept_connection',attendee_id);
    },
  
    ignoreConnection(attendee_id){
      App.state.connection.emit('ignore_connection', attendee_id);
    },
  
    sendCard(attendee_id){
      App.state.connection.emit('send_card', attendee_id);
    },
    
    saveCard(attendee_id){
      App.state.connection.emit('save_card', attendee_id);
    },
  
    deleteCard(attendee_id){
      App.state.connection.emit('delete_card', attendee_id);
    },
  
    logOut(){
      this.state.connection.emit('log_out','');
    },
  
    showNotifications(){
      this.setState({ modalShow: true });
    },

    loadDataIfLoggedIn(){
      if(! (App.state.connection && App.state.loggedIn)){
        return;
      }
      if(! App.state.user){
        App.getUser();
      }
      if(! App.state.attendee){
        App.getAttendee();
      }
      if(! App.state.attendees){
        App.getAttendees();
      }
      if(! (this.state.categories && this.state.subCategories) ){
        App.getCategories();
      }
    }
  }
}