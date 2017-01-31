
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id: 1, username: 'Mikey', email:"mikey@gmail.com", password: "password"}),

        knex('users').insert({id: 2, username: 'George', email:"george@gmail.com", password: "password"}),

        knex('users').insert({id: 3, username: 'bonnie', email:"bonnie@gmail.com", password: "password"})
      ]);
    });
};
