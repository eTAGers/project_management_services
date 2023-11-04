const { query } = require("../helper/executequery");
const User = require("../models/user.model");
const { loginQuery } = require("../queries/auth.query");
const { responseHandler } = require("../utils");
const { responseMessages } = require("../utils/messages");
const {
  hash: hashPassword,
  compare: comparePassword,
} = require("../utils/password");
const { loginSchema } = require("../utils/schema");
const { generate: generateToken } = require("../utils/token");
const { mysqlSingleResponseHandler } = require("../utils/utility");

exports.signup = (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const hashedPassword = hashPassword(password.trim());

  const user = new User(
    firstname.trim(),
    lastname.trim(),
    email.trim(),
    hashedPassword
  );

  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    } else {
      const token = generateToken(data.id);
      res.status(201).send({
        status: "success",
        data: {
          token,
          data,
        },
      });
    }
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email.trim(), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: "error",
          message: `User with email ${email} was not found`,
        });
        return;
      }
      res.status(500).send({
        status: "error",
        message: err.message,
      });
      return;
    }
    if (data) {
      if (comparePassword(password.trim(), data.password)) {
        const token = generateToken(data.id);
        res.status(200).send({
          status: "success",
          data: {
            token,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
          },
        });
        return;
      }
      res.status(401).send({
        status: "error",
        message: "Incorrect password",
      });
    }
  });
};
exports.loginHandler = async (req, res) => {
  try {
    await loginSchema.validateAsync(req.body);

    let resp;
    resp = await query(loginQuery(req.body.email));

    if (!resp || !Object.keys(resp).length) {
      responseHandler.errorResponse(
        res,
        responseMessages.userNotFound,
        responseMessages.userNotFound
      );
      return;
    }
    const rows = mysqlSingleResponseHandler(resp);
    if (comparePassword(rows.password.trim(), req.body.password)) {
      delete rows.hashedpassword;
      const newToken = generateToken(rows);
      responseHandler.successResponse(
        res,
        {
          token: newToken,
          ...rows,
        },
        responseMessages.loginSuccessfully
      );
    } else {
      responseHandler.errorResponse(res, {}, responseMessages.loginFailed);
    }
  } catch (err) {
    responseHandler.errorResponse(res, err.message, err.message);
  }
};
