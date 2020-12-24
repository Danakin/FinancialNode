import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const rules = [
  body("email").isEmail().withMessage("Please enter a valid E-Mail address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("The Password must be at least 8 characters")
    .custom((pw, { req }) => {
      if (!(pw === req.body.password_confirmation)) {
        throw new Error("Password confirmation failed");
      }
      return true;
    }),
];

function validate(req: Request, res: Response, next: NextFunction) {
  const err = validationResult(req);
  if (err.isEmpty()) {
    return next();
  }
  return res.render("register.njk", {
    errors: err.mapped(),
    email: req.body.email,
  });
}

export { rules, validate };
