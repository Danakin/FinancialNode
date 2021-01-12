import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const rules = [
  check("email").isEmail().withMessage("Please enter a valid E-Mail address"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("The Password must be at least 8 characters"),
];

function validate(req: Request, res: Response, next: NextFunction) {
  const err = validationResult(req);
  if (err.isEmpty()) {
    return next();
  }
  return res.render("login.njk", {
    _csrf: req.csrfToken(),
    errors: err.mapped(),
    email: req.body.email,
  });
}

export { rules, validate };
