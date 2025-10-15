import * as yup from "yup";

export interface CreateJobFormValues {
  description: string;
  datepplied: string;
  link?: string;
}

export const boostrapCreateJobFormSchema = yup.object({
  description: yup.string().required("Description is required"),
  datepplied: yup.string().required("Date Applied is required"),
  link: yup.string().optional(),
}) as yup.ObjectSchema<CreateJobFormValues>;



interface EditJobFormValues {
    title: string;
    company: string;
    location: string;
    salary: number | string;
    dateapplied: string;
    link?: string;
}


export const bootstrapEditJobFormSchema = yup.object({
    title: yup.string().required("Title is required"),
    company: yup.string().required("Company is required"),
}) as yup.ObjectSchema<EditJobFormValues>;


