module.exports = function(knex){

  function getUserById(userId, cb) {
    knex.select('*').from('users')
      .where('id', userId)
      .asCallback(function(err, userInfo) 
      {
        if (err) {
          throw err;
        }
        cb(null, userInfo[0])
      }
    );
  }

  function createUser(data, cb) {
    knex('users')
    .insert(data)
    .returning('*')
    .asCallback((err, user)=> 
    {
      if (err) {
        throw err;
      }
      cb(null, user);
    });
  }

  return {
    getUserById,
    createUser
  }  
}