
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('haves').del()
    .then(function(){
      return knex('wants').del()
      .then(function(){
        return knex('sub_categories').del()
        .then(function(){
          return knex('categories').del()
          .then(function(){
            return knex('connections').del()
            .then(function(){
              return knex('card_shares').del()
              .then(function(){
                return knex('organizers').del()
                .then(function(){
                  return knex('attendees').del()
                  .then(function(){
                    return knex('events').del()
                    .then(function(){
                      return knex('users').del()
                    })                      
                  })
                })
              })
            })
          })
        })
      })
    })
};

