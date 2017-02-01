
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_events', function(table){
    table.increments('id');
    table.integer('user_id').notNullable().references('id').inTable('users').onDelete("CASCADE");
    table.integer("event_id").notNullable().references('id').inTable('events').onDelete("CASCADE");
  })
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('users_events')]);
};
