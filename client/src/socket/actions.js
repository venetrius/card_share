function actions(App) {
  return {

    logOut : function(msg){
      App.state.connection.emit('logout','');
    },

  }
}



// ----------------------------------------------
//              Exports Module
// ----------------------------------------------

module.exports = actions