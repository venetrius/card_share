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
  const user_connection = this.user_connection;
  Object.keys(user_connection).forEach(function(targetUserID){
    if(targetUserID != exception){
      const socket = io.in(user_connection[targetUserID]);
      if(socket){
        socket.emit(messageType, JSON.stringify(message));
      }
    }
  });
}


module.exports = new Model();
