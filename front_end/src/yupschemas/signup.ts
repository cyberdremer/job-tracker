import * as Yup from "yup";

export interface SignUpFormValues {
  email: string;
  password: string;
  confirmpassword: string;
  firstname: string;
  lastname: string;
  signupcode?: string;
}

export const bootstrapSignUpFormSchema = Yup.object({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  signupcode: Yup.string().required("Signup code is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmpassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match!")
    .min(8, "Confirm password must be at least 8 characters long"),
});
