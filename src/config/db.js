const {Pool} = require("pg");
require("dotenv").config({quite: true});

const pool = new Pool({
    // host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,

    connectionString: process.env.DB_URL,
});

pool.connect((error, client, release) => {
  if(error) {
    console.log("Error occurred on connected database:", error);
    return;
  }


  console.log("Database connected Successfully");
  release();

})

module.exports = pool;

