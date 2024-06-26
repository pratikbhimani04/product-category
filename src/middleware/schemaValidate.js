const validateSchema = (schema) => {
  return (req, res, next) => {
    if (schema.body) {
      const { error: bodyError } = schema.body.validate(req.body);
      if (bodyError) {
        return res.status(400).json({
          message: bodyError.details[0].message,
        });
      }
    }

    if (schema.params) {
      const { error: paramsError } = schema.params.validate(req.params);
      if (paramsError) {
        return res.status(400).json({
          message: paramsError.details[0].message,
        });
      }
    }
    next();
  };
};

module.exports = validateSchema;
