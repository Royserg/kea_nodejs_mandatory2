
exports.up = function(knex) {
  return knex.schema.table('users', (t) => {
      t.string('email').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.table('users', (t) => {
    t.dropColumn('email')
  })
};
