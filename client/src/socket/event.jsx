const user = function(msg){
  App.sendAlert(msg);
  msg=JSON.parse(msg)
};

const categories = function(msg){
  App.sendAlert(msg);
  msg=JSON.parse(msg)
  App.setState({categories: msg.categories, subCategories: msg.subCategories});
};


// ----------------------------------------------
//              Exports Module
// ----------------------------------------------

  module.exports = {
    user,
    categories
  };