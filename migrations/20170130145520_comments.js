
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table){
    table.increments('id');
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.integer('article_id').unsigned().notNullable();
    table.foreign('article_id').references('id').inTable('articles').onDelete('cascade');
    table.text('comment').notNullable().defaultTo('');
  })
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('comments')])
};
