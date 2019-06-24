module.exports = function(knex){

  function getUserById(userId, cb) {
    knex.select('*').from('users')
      .where('id', userId)
      .asCallback(function(err, userInfo) {
        if (err) {
          throw err;
        }
        cb(null, userInfo[0])
      });
  }

  return {
    getUserById
  }  
}