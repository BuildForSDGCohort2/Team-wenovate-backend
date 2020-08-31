const Validator = require('validatorjs');
const validateRequestCredentials = (req, res, next, rule) => {
  const validation = new Validator(req.body, rule);

  if (validation.passes()) {
    return next();
  }

  const errors = validation.errors.all();
  return res.status(400).json({
    message: 'Invalid Credentials',
    errors,
  });
};
module.exports = {
  validateRegisterCredentials: (req, res, next) => {
    const rule = {
      username: 'required|string',
      email: 'required|email',
      password: 'required|string',
    };
    return validateRequestCredentials(req, res, next, rule);
  },
  validateLoginCredentials: (req, res, next) => {
    const rule = {
      email: 'required|string',
      password: 'required|string',
    };
    return validateRequestCredentials(req, res, next, rule);
  },
  validateConnectCredentials: (req, res, next) => {
    const rule = {
      title: 'required|string',
      description: 'required|string',
      connect_type: 'required|string',
      user: 'required|string',
    };
    return validateRequestCredentials(req, res, next, rule);
  },
};
