import { body } from "express-validator";
import prisma from "../config/prisma.js";
const emptyError = "this field cannot be empty";
const emailError = "Not a valid email address, please try again";
import "dotenv/config";
import { Status } from "@prisma/client";
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
    body("confirmpassword")
        .trim()
        .notEmpty()
        .withMessage(`Confirm password: ${emptyError}`)
        .custom(async (value, { req }) => {
        return value === req.body.password;
    })
        .withMessage(`Confirm password: password and the confirm password need to be the same`),
    body("signupcode")
        .trim()
        .notEmpty()
        .withMessage(`Sign up code :${emptyError}`)
        .custom((value) => {
        return value === process.env.SIGN_UP_CODE;
    })
        .withMessage(`Sign Up Code: Invalid Sign Up Code, Try Again!`),
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
const jobEntryValidator = [
    body("description")
        .trim()
        .notEmpty()
        .withMessage(`Description: ${emptyError}`),
    body("dateapplied")
        .trim()
        .notEmpty()
        .withMessage(`Date Applied: ${emptyError}`),
    body("link")
        .optional()
        .trim()
        .isURL()
        .withMessage("Link: Must be a valid URL"),
    body("description")
        .trim()
        .notEmpty()
        .withMessage(`Job Description: ${emptyError}`),
    body("status")
        .trim()
        .notEmpty()
        .withMessage(`Status: ${emptyError}`)
        .custom((value) => {
        return Object.values(Status).includes(value.toUpperCase());
    })
        .withMessage("Status: Not a valid status, please select a valid status and try again"),
];
const editJobEntryValidator = [
    body("title").trim().notEmpty().withMessage(`Title: ${emptyError}`).escape(),
    body("company")
        .trim()
        .notEmpty()
        .withMessage(`Company: ${emptyError}`)
        .escape(),
    body("location")
        .trim()
        .notEmpty()
        .withMessage(`Location: ${emptyError}`)
        .escape(),
    body("salary")
        .trim()
        .notEmpty()
        .withMessage(`Salary: ${emptyError}`)
        .isNumeric()
        .withMessage("Salary: Must be a valid number"),
    body("status")
        .trim()
        .notEmpty()
        .withMessage(`Status: ${emptyError}`)
        .custom((value) => {
        return Object.values(Status).includes(value.toUpperCase());
    })
        .withMessage("Status: Not a valid status, please select a valid status and try again"),
];
export { signUpValidator, loginValidator, jobEntryValidator, editJobEntryValidator, };
