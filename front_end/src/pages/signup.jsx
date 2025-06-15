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
import { Navigate, useNavigate } from "react-router";
import AlertBox from "@/alerts/alertbox";
import backendUrl from "@/utils/backendurl";

const Signup = ({}) => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    signupcode: "",
  });

  const [error, setError] = useState({
    message: "",
    occurred: false,
  });

  const [success, setSuccess] = useState({
    message: "",
    occurred: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    try {
      const response = await postRequest("/signup/local", form);
      if (response.error) {
        throw new Error(response.error.message);
      }
      setSuccess({
        message: response.data.message,
        occurred: true,
      });

      setTimeout(() => {
        setSuccess({
          message: "",
          occurred: false,
        });
      }, timer);
    } catch (error) {
      setError({
        message: error.message,
        occurred: true,
      });

      setTimeout(() => {
        setError({
          message: "",
          occurred: false,
        });
      }, timer);
    }
  };

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
                value={form.firstname}
                onChange={handleChange}
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Last Name:
                <Field.RequiredIndicator></Field.RequiredIndicator>
              </Field.Label>
              <Input
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
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
              value={form.email}
              onChange={handleChange}
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
              value={form.password}
              onChange={handleChange}
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
              value={form.confirmpassword}
              onChange={handleChange}
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
              value={form.signupcode}
              onChange={handleChange}
            />
          </Field.Root>
        </Fieldset.Content>
        <Button
          type="submit"
          alignSelf="flex-start"
          minWidth="100%"
          onClick={handleSignUp}
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
