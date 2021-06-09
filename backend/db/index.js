const { Pool } = require('pg');

// pool of clients that can connect to the db
const pool = new Pool({
	  database: 'aic',
    host: 'localhost',
    port: 5432 // what port the postgres db process listens on
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
}