import config from "../helpers/constants.js"
import knex from "knex"

export default knex({
  client: 'mysql2',
  connection: {
    host: config.dbconfig.host,
    port: config.dbconfig.port,
    user: config.dbconfig.user,
    database: config.dbconfig.database
  }
})