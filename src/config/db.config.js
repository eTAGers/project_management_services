const mysql = require("mysql");
const { logger } = require("../utils/logger");
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = require("../utils/secrets");

const connection = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  multipleStatements: true,
});

const connectToDB = () => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      logger.info("Connected to DB");
      resolve(connection);
    });
  });
};
connectToDB();
module.exports = connection;
exports.connection = connection;
