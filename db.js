const Pool = require('pg').Pool
const pool = new Pool({
	user: 'postgres',
	password: '040104',
	host: 'localhost',
	port: 5432,
	database: 'trainee-back'
})

module.exports = pool