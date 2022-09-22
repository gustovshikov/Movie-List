/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('movies', table => {
    table.increments('user_id'); // adds an auto incrementing
    table.string('name', 128).notNullable();
    table.string('date', 128).notNullable();
    table.string('studio', 128).notNullable();
    table.string('country', 128).notNullable();
    table.string('runtime', 128).notNullable();
    table.string('rating', 128).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('movies');
};
