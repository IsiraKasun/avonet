const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const catagoryController = require("../controllers/catagory-controller");
const { authenticateToken } = require("../utils/token-authenticator");

router.get("/", authenticateToken, (req, res, next) => {
  catagoryController.getAll(req, res);
});

router.post(
  "/",
  authenticateToken,
  [body("name").trim().notEmpty().withMessage("Category name cannot be Empty")],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    catagoryController.create(req, res);
  }
);

router.put(
  "/:id",
  authenticateToken,
  [body("name").trim().notEmpty().withMessage("Category name cannot be Empty")],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    catagoryController.update(req, res);
  }
);

router.delete("/:id", authenticateToken, (req, res, next) => {
  catagoryController.delete(req, res);
});

module.exports = router;
