
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(table){
    table.increments('id')
    table.string('username').notNullable().defaultTo('');
    table.string('email').notNullable().defaultTo('');
    table.string('password').notNullable().defaultTo('');

  })
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('users')
  ]);
};
