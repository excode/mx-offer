const Pool = require("pg").Pool;
const env = process.env;
const pool = new Pool({
  user: env.DB_USER || 'postgres',
  password: env.DB_PASSWORD || "1234" ,
  host: env.DB_HOST || "localhost",
  port: env.DB_PORT || 5432,
  database: env.DB_NAME || "mytest" 
});

module.exports = pool;