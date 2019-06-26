function eventHandlers(App) {
  return {

    user : function(msg){
      App.sendAlert(msg);
      msg=JSON.parse(msg);
      App.setState({user : msg})
    },
    
    categories : function(msg){
      App.sendAlert(msg);
      msg=JSON.parse(msg);
      App.setState({categories: msg.categories, subCategories: msg.subCategories});
    }

  }
}



// ----------------------------------------------
//              Exports Module
// ----------------------------------------------

module.exports = eventHandlers