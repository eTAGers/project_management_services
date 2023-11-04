const connection = require("../config/db.config");
const { logger } = require("../utils/logger");

const query = async (QUERY, params) => {
  return new Promise((resolve, reject) => {
    connection.query(QUERY, params, function (err, result) {
      if (err) {
        console.log("Error in database query:", err);
        reject(err);
      } else {
        console.log(
          "Query:",
          QUERY,
          "params:",
          params,
          "query result:",
          result
        );
        resolve(result);
      }
    });
  });
};

module.exports = { query };
