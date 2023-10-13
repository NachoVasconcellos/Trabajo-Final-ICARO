const { body, validationResult } = require("express-validator");

const validateAddedProducts = [
  body("Nombre").notEmpty().withMessage("Debes ingresar un nombre"),
  body("Categorie").notEmpty().withMessage("Debes ingresar un categoria"),
  body("Price")
    .notEmpty()
    .withMessage("Debes ingresar el precio")
    .isNumeric()
    .withMessage("Debes ingresar solo números"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ ERRORES: errors.array() });
    }
    next();
  },
];

const validateUpdatedProducts = [
  body("Nombre").notEmpty().withMessage("Debes ingresar el nombre"),
  body("Price")
    .notEmpty()
    .withMessage("Debes ingresar el precio")
    .isNumeric()
    .withMessage("Debes ingresar solo números"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ ERRORES: errors.array() });
    }
    next();
  },
];

module.exports = { validateAddedProducts, validateUpdatedProducts };
