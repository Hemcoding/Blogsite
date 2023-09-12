import knex from 'knex'
import config from '../helpers/constant.js'

export default knex({
    client:'mysql2',
    connection:{
        host:config.dbconfig.host,
        port:config.dbconfig.port,
        user:config.dbconfig.user,
        database:config.dbconfig.database

    }
})