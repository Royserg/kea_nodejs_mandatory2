const { database, user, password } = require('./config/mysqlCredentials')

const { knexSnakeCaseMappers } = require('objection')

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: database,
      user:     user,
      password: password
    },
    // Mapps sql snake-case to js camel-case
    ...knexSnakeCaseMappers()
  },

};
