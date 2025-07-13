// backend\middleware\validateSchema.js
const validateSchema = (Schema) => async (req, res, next) => {
  try {
    const parsedBody = await Schema.parseAsync(req.body);
    req.body = parsedBody;
    next();
  } catch (error) {
    const status = 400;
    const message = "Please fill the input properly.";
    const details = error.errors.map((err) => err.message).join(", ");

    return res.status(status).json({
      status,
      message,
      errors: details,
    });
  }
};

export default validateSchema;
