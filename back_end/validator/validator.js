import { body } from "express-validator";
import prisma from "../config/prisma.js";
const emptyError = "this field cannot be empty";
const emailError = "Not a valid email address, please try again";
const signUpValidator = [
  body("firstname")
    .trim()
    .notEmpty()
    .withMessage(`First Name :${emptyError}`)
    .escape(),
  body("lastname")
    .trim()
    .notEmpty()
    .withMessage(`Last Name: ${emptyError}`)
    .escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage(`Email :${emptyError}`)
    .normalizeEmail()
    .isEmail()
    .withMessage(`Email :${emailError}`)
    .custom(async (value) => {
      const user = await prisma.user.findFirst({
        where: {
          email: value,
        },
      });
      if (user) {
        throw new Error("Email is already registered!");
      }
    }),
  body("password").trim().notEmpty().withMessage(`Password: ${emptyError}`),
  body("currentpassword")
    .trim()
    .notEmpty()
    .withMessage(`Confirm password: ${emptyError}`)
    .custom((value) => {
      return value === req.body.password;
    })
    .withMessage(
      `Confirm password: password and the confirm password need to be the same`
    ),
];

const loginValidator = [
  body("password").trim().notEmpty().withMessage(`Password :${emptyError}`),
  body("email")
    .trim()
    .notEmpty()
    .withMessage(`Email: ${emptyError}`)
    .isEmail()
    .withMessage(`Email: ${emailError}`),
];

export { signUpValidator, loginValidator };
