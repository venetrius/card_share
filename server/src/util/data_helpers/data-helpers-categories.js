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

  return {
    getCategories,
    getSubCategories
  }  
}