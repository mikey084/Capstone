
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({ username: 'Mikey', email:"mikey@gmail.com", password: "password"}),

        knex('users').insert({username: 'George', email:"george@gmail.com", password: "password"}),

        knex('users').insert({ username: 'bonnie', email:"bonnie@gmail.com", password: "password"})
      ]);
    });
};
