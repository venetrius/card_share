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

  function addInterests(attendee_id, table, interests, cb){
    knex(table).insert(interests)
    .returning('*')
    .asCallback(cb)
  }

  function updateInterestsById(attendee_id, interests, cb) {
    const haveObjs = interests.haves.map(have => {return {attendee_id : attendee_id, sub_category_id : have}});
    const wantObjs = interests.wants.map(want => {return {attendee_id : attendee_id, sub_category_id : want}});
    if(haveObjs.length > 0){
      if(wantObjs.length > 0){
        addInterests(attendee_id, 'haves', haveObjs,
          function(err, haves){
            if(err){
              return cb(err, null);
            }
            addInterests(attendee_id, 'wants', wantObjs, 
              function(err, wants){
                cb(err, {haves, wants});
              }
            );
          }
        )
      }else{
        addInterests(attendee_id, 'haves', haveObjs, ((err, haves) => cb(err, {haves : haves, wants : []})));
      }
    }else{
      addInterests(attendee_id, 'wants', haveObjs, ((err, wants) => cb(err, {haves : [], wants : wants})) );
    }
  }



  return {
    getCategories,
    getSubCategories,
    updateInterestsById
  }  
}