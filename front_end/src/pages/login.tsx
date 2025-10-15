import { useContext, useState } from "react";
import {
  Field,
  Input,
  InputGroup,
  Fieldset,
  Stack,
  Text,
  HStack,
  Button,
} from "@chakra-ui/react";
import timer from "@/utils/popuptimer";
import { FaGoogle } from "react-icons/fa";
import { postRequest, protectedPostRequest } from "@/utils/requests";
import { useNavigate } from "react-router";
import AlertBox from "@/alerts/alertbox";
import backendUrl from "@/utils/backendurl";
import { AuthContext } from "@/context/authcontext";
import { useFormik } from "formik";
import { bootstrapLoginFormSchema, LoginFormValues } from "@/yupschemas/login";
import { useRequestMutation } from "@/requests/generic";
import { ServerResponse } from "@/interfaces/server";

interface LoginResponse {
  fullname: string;
}

const Login = ({}) => {
  const { setAuthed } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialLoginFormValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const mutation = useRequestMutation<ServerResponse<LoginResponse>>();

  const formik = useFormik({
    initialValues: initialLoginFormValues,
    validationSchema: bootstrapLoginFormSchema,
    onSubmit: (values) => {
      mutation.mutate(
        {
          url: "/login/local",
          options: {
            method: "POST",
            mode: "cors",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            credentials: "include",
          },
          body: values,
        },

        {
          onSuccess: (response: ServerResponse<LoginResponse>) => {
            setSuccess({
              message: response.data.message || "Logged in successfully!",
              occurred: true,
            });

            setTimeout(() => {
              setSuccess({
                message: "",
                occurred: false,
              });

              setAuthed(true);
              navigate("/dashboard");
            });
          },
          onError: (error) => {
            setError({
              message: error.message || "An error occurred during login.",
              occurred: true,
            });

            setTimeout(() => {
              setError({
                message: "",
                occurred: false,
              });
            });
          },
        }
      );
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

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    const popup: Window = window.open(
      `${backendUrl}/oauth/google`,
      "googleLogin",
      "width=500,height=600,noopener,noreferrer"
    );
  };

  return (
    <>
      {success.occurred && (
        <AlertBox
          type={"success"}
          title={"Success"}
          message={success.message}
        ></AlertBox>
      )}
      {error.occurred && (
        <AlertBox
          type={"error"}
          title={"Error"}
          message={error.message}
        ></AlertBox>
      )}
      <Fieldset.Root
        size="lg"
        maxW="md"
        alignSelf="center"
        animationName="fade-in"
        animationDuration="slowest"
        marginTop="4rem"
      >
        <Stack>
          <Fieldset.Legend>
            <Text fontSize="2xl">Log In details</Text>
          </Fieldset.Legend>
          <Fieldset.HelperText>
            Enter your log in details below
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root required>
            <Field.Label>
              Email: <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Password: <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </Field.Root>
        </Fieldset.Content>
        <Button
          type="submit"
          minWidth="100%"
          onClick={() => formik.handleSubmit}
        >
          Log in
        </Button>
        <Button type="submit" minWidth="100%" onClick={handleGoogleLogin}>
          Log in with <FaGoogle></FaGoogle>
        </Button>
      </Fieldset.Root>
    </>
  );
};

export default Login;
