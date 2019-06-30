module.exports = function(knex){

  function getCategories(id, cb) {
    knex.select('*').from('categories')
      .where('event_id', id)
      .asCallback(function(err, categories) 
      {
        if (err) {
          throw err;
        }
        getSubCategories(categories, cb)
      }
    );
  }

  function getSubCategories(categories, cb) {
    const ids = categories.map(cat => cat.id)
    knex.select('*').from('sub_categories')
      .whereIn('category_id', ids)
      .asCallback(function(err, subCategories) 
      {
        if (err) {
          throw err;
        }
        cb(null, {subCategories, categories})
      }
    );
  }


  function updateInterestsById(attendee_id, interests, cb) {
    knex('haves').insert(interests.haves.map(have => {return {attendee_id : attendee_id, sub_category_id : have}}))
    .returning('*')
    .asCallback(function(err, haves){
      if(err){
        cb(err, null)
      }else{
        knex('wants').insert(interests.wants.map(want => {return {attendee_id : attendee_id, sub_category_id : want}}))
        .returning('*')
        .asCallback(function(err, wants){
          if(err){
            cb(err, null)
          }else{
            cb(null, {haves, wants})
          }
        });
      }
    });
  }



  return {
    getCategories,
    getSubCategories,
    updateInterestsById
  }  
}