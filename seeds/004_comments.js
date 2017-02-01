
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('comments').insert({ user_id: 1, article_id: 3, comment:"Wow Thats really interesting! I didn't know Data Structures could be used like that!"}),
        knex('comments').insert({ user_id: 2 , article_id:1, comment:"Linked Lists seem to by a dynamic data structure! Do you have any ideas as to what kind of projects I can use a Linked List in?"}),
        knex('comments').insert({ user_id: 3, article_id:2, comment:"Tries seem like very daunting topic to cover do you know of any tutorials in which I can read more about?"})
      ]);
    });
};
