const { query } = require("../helper/executequery");
const { responseHandler } = require("../utils");
const { crudMethod } = require("../utils/dynamicUtils");
const { responseMessages } = require("../utils/messages");

exports.crud = async (req, res) => {
  try {
    const { table } = req.params;
    const { data, condition, method } = req.body;
    let resp;
    let sql = crudMethod(method, table, data, condition);
    resp = await query(sql);
    responseHandler.successResponse(
      res,
      { resp },
      responseMessages.successBoolean
    );
  } catch (error) {
    responseHandler.errorResponse(
      res,
      error.message,
      responseMessages.failureBoolean
    );
  }
};
