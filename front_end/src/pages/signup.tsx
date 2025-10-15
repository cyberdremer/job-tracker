import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import {
  Field,
  Input,
  InputGroup,
  Fieldset,
  Stack,
  HStack,
  Button,
} from "@chakra-ui/react";
import timer from "@/utils/popuptimer";
import { getRequest, postRequest, protectedGetRequest } from "@/utils/requests";
import { useRequestMutation } from "@/requests/generic";
import { Navigate, useNavigate } from "react-router";
import AlertBox from "@/alerts/alertbox";
import backendUrl from "@/utils/backendurl";
import {
  bootstrapSignUpFormSchema,
  SignUpFormValues,
} from "@/yupschemas/signup";
import { ServerResponse } from "@/interfaces/server";
import { useFormik } from "formik";



const Signup = ({}) => {
  

  const initialSignUpFormValues: SignUpFormValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    signupcode: "",
  };

  const signupMutation = useRequestMutation<ServerResponse>();

  const formik = useFormik({
    initialValues: initialSignUpFormValues,
    validationSchema: bootstrapSignUpFormSchema,
    onSubmit: (values) => {
      signupMutation.mutate({
        url: "/signup/local",
        options: { method: "POST", mode: "cors" },
        body: values,
      }, {
        onSuccess: (response: ServerResponse) => {
          setSuccess({
            message: response.data.message || "Account created succesfully",
            occurred: true,
          })

          setTimeout(() => {
            setSuccess({
              message: "",
              occurred: false,
            })
          }, timer)
        },
        onError:(error: Error) => {
          setError({
            message: error.message || "An error occurred during sign up.",
            occurred: true,
          })

          setTimeout(() => {
            setError({
              message: "",
              occurred: false,
            })
          }, timer)
        }
      });
    },
  });

  const [error, setError] = useState({
    message: "",
    occurred: false,
  });

  const [success, setSuccess] = useState({
    message: "",
    occurred: false,
  });

  

  

  const handleGoogleSignUp = async (e) => {
    e.preventDefault();
    window.open(`${backendUrl}/oauth/google`, "_self");
  };

  return (
    <>
      {success.occurred && (
        <AlertBox
          title={"Success"}
          type={"success"}
          message={success.message}
        ></AlertBox>
      )}
      {error.occurred && (
        <AlertBox title="Error" type="error" message={error.message}></AlertBox>
      )}

      <Fieldset.Root
        size="lg"
        maxW="md"
        alignSelf="center"
        animationName="fade-in"
        animationDuration="slowest"
        marginTop="3rem"
      >
        <Stack>
          <Fieldset.Legend>Sign Up details</Fieldset.Legend>
          <Fieldset.HelperText>
            Please enter your sign up details
          </Fieldset.HelperText>
        </Stack>
        <Fieldset.Content>
          <HStack>
            <Field.Root required>
              <Field.Label>
                First Name:
                <Field.RequiredIndicator></Field.RequiredIndicator>
              </Field.Label>
              <Input
                name="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange}
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Last Name:
                <Field.RequiredIndicator></Field.RequiredIndicator>
              </Field.Label>
              <Input
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
              />
            </Field.Root>
          </HStack>
          <Field.Root required>
            <Field.Label>
              Email address:
              <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Password:
              <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Confirm password:
              <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input
              name="confirmpassword"
              type="password"
              value={formik.values.confirmpassword}
              onChange={formik.handleChange}
            />
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Signup Code: (Case Sensitive)
              <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input
              name="signupcode"
              type="input"
              value={formik.values.signupcode}
              onChange={formik.handleChange}
            />
          </Field.Root>
        </Fieldset.Content>
        <Button
          type="submit"
          alignSelf="flex-start"
          minWidth="100%"
          onClick={() => formik.handleSubmit()}
        >
          Create account
        </Button>
        <Button onClick={handleGoogleSignUp}>
          Sign Up With <FaGoogle></FaGoogle>{" "}
        </Button>
      </Fieldset.Root>
    </>
  );
};

export default Signup;
