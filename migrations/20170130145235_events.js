
exports.up = function(knex, Promise) {
  return knex.schema.createTable("events", function(table){
    table.increments('id').primary();
    table.string('name').notNullable().defaultTo('');
    table.string('occupation').notNullable().defaultTo('')
    table.string('title').notNullable().defaultTo('');
    table.text('description').notNullable().defaultTo('');
    table.string('address').notNullable().defaultTo('');

  })
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('events')]);
};
