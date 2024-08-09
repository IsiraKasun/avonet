const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userController = require("../controllers/user-controller");


router.post(
  "/",
  [
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("First Name cannot be Empty"),
    body("firstName")
      .isLength({ max: 100 })
      .withMessage("First Name must not be longer than 100 characters"),
    body("lastName").trim().notEmpty().withMessage("Last Name cannot be Empty"),
    body("lastName")
      .isLength({ max: 100 })
      .withMessage("Last Name must not be longer than 100 characters"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").notEmpty().withMessage("Password cannot be empty"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    userController.singup(req, res);
  }
);

router.post(
  "/signin",
  [
    body("email").trim().notEmpty().withMessage("Email is required"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    userController.signin(req, res);
    
  }
);

module.exports = router;
