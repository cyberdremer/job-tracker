import { yupToFormErrors } from "formik";
import * as Yup from "yup";
export interface LoginFormValues {
  email: string;
  password: string;
}



export const bootstrapLoginFormSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Passsword must be at least 8 characters long!")
    .required("Password is required"),
});
