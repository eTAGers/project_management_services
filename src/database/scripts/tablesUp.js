const { logger } = require("../../utils/logger");
const { createTable } = require("../tableQueries");

(() => {
  require("../../config/db.config").query(createTable, (err, _) => {
    if (err) {
      logger.error(err.message);
      return;
    }
    logger.info("Table users created!");
    process.exit(0);
  });
})();
