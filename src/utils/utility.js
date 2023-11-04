exports.mysqlResponseHandler = function (records) {
  let rows = [];
  rows = [...records];
  return rows;
};
exports.mysqlSingleResponseHandler = function (records) {
  let rows = {};
  rows = { ...records[0] };
  return rows;
};
exports.mysqlSingleObjResponseHandler = function (records) {
  let rows;
  if (records && records.recordset && records.recordset.length) {
    rows = records.recordset[0];
  }
  return rows;
};

exports.parseSqlResult = function () {
  return JSON.parse(JSON.stringify(this[0]));
};

module.exports.getTenantIdFromRequest = (req) => {
  // Extract tenantId from the request headers or other places as needed
  const tenantId = req.headers["tenant"];
  return tenantId;
};
