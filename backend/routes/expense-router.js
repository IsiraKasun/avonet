const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const expenseController = require("../controllers/expense-controller");
const moment = require("moment");
const {
  authenticateToken
} = require("../utils/token-authenticator");

router.get("/", authenticateToken, (req, res, next) => {
  expenseController.getAll(req, res);
});

router.post(
  "/",
  authenticateToken,
  [
    body("amount").trim().isNumeric().withMessage("Amount is invalid"),
    body("desc").trim().notEmpty().withMessage("Description cannot be empty"),
    body("desc")
      .isLength({ max: 200 })
      .withMessage("Description must not be longer than 200 characters"),
    body("cat").trim().notEmpty().withMessage("Category cannot be Empty"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    expenseController.create(req, res);
  }
);

router.put(
  "/:id",
  authenticateToken,
  [
    body("amount").trim().isNumeric().withMessage("Amount is invalid"),
    body("desc").trim().notEmpty().withMessage("Description cannot be empty"),
    body("desc")
      .isLength({ max: 200 })
      .withMessage("Description must not be longer than 200 characters"),
    body("cat").trim().notEmpty().withMessage("Category cannot be Empty")
  ],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    expenseController.update(req, res);
  }
);

router.delete("/:id", authenticateToken, (req, res, next) => {
  expenseController.delete(req, res);
});

module.exports = router;
