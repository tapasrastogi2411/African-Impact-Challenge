const { Pool } = require('pg');
const connectionStringURI = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/aic';

// pool of clients that can connect to the db
const pool = new Pool({
    connectionString: connectionStringURI,
    ssl: {
      rejectUnauthorized: false
    }
    
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback); // can return a promise
  },
}