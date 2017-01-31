
exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', function(table){
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users').onDelete('cascade');
    table.string('title').notNullable().defaultTo('');
    table.text('body').notNullable().defaultTo('');
  })
};

exports.down = function(knex, Promise) {
  return Promise.all(([knex.schema.dropTable('articles')]))
};
