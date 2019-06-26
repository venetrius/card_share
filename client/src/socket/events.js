function eventHandlers(App) {
  return {

    user : function(msg){
      App.sendAlert(msg);
      msg=JSON.parse(msg);
      App.setState({user : msg})
    },

    attendees : function(msg){
      App.sendAlert(msg);
      msg=JSON.parse(msg);
      App.setState({attendees : msg})
    },
    
    categories : function(msg){
      App.sendAlert(msg);
      msg=JSON.parse(msg);
      App.setState({categories: msg.categories, subCategories: msg.subCategories});
    },

    connection_change : function(msg){
      App.sendAlert(msg)
    }

  }
}



// ----------------------------------------------
//              Exports Module
// ----------------------------------------------

module.exports = eventHandlers