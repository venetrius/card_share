class Model {
  constructor(){
    this.user_connection = {};
    this.connection_user = {};
  }
}

//TODO what if user is logging in for more device / tab at the same time ...
Model.prototype.register = function(userId, connectionId){
  this.user_connection[userId] = connectionId;
  this.connection_user[connectionId] = userId;
}

Model.prototype.deleteUser = function(userId){
  delete this.connection_user[this.user_connection[userId]];
  delete this.user_connection[userId];
}

Model.prototype.deleteConnection = function(connectionId){
  delete this.user_connection[this.connection_user[connectionId]];
  delete this.connection_user[connectionId];
}

Model.prototype.retriveUser = function(userId){
  return this.user_connection[userId];
}

Model.prototype.broadcast = function(io, messageType, message, exception){
  Object.keys(this.connection_user).forEach(function(targetSocketID){
    if(targetSocketID !== exception){
      io.in(targetSocketID).emit(messageType, JSON.stringify(message));
    }
  });
}


module.exports = new Model();
