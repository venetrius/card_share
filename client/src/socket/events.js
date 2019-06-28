function eventHandlers(App) {
  return {

    user : function(msg){
      App.sendAlert(msg);
      msg=JSON.parse(msg);
      App.setState({user : msg})
    },

    attendee : function(msg){
      msg=JSON.parse(msg);
      if( !msg.error){
        App.setState({attendee : msg})
      }else{
        App.sendAlert(msg);
      }
    },

    attendees : function(msg){
      App.sendAlert(msg);
      msg=JSON.parse(msg);
      console.log(msg);
      App.setState({attendees : msg})
    },
    
    categories : function(msg){
      App.sendAlert(msg);
      msg=JSON.parse(msg);
      App.setState({categories: msg.categories, subCategories: msg.subCategories});
    },

    connection_change : function(msg){
      App.sendAlert(msg)
    },

    cardshare_change : function(msg){
      App.sendAlert(msg)
    },

    profile : function(msg){
      App.setState({profile : JSON.parse(msg)});
    },

    is_authorized : function(msg){
      App.setState({loggedIn : msg});
    }
  }
}



// ----------------------------------------------
//              Exports Module
// ----------------------------------------------

module.exports = eventHandlers