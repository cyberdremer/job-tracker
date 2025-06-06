import { useState } from "react";
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
import { postRequest } from "@/utils/requests";
import { useNavigate } from "react-router";
import AlertBox from "@/alerts/alertbox";
const Login = ({}) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
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

  const handleLogin = async (e) => {
    try {
      const response = await postRequest("/login/local", form);
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
        navigate("/dashboard");
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

  const handleGoogleLogin = (e) => {};

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
              value={form.email}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Password: <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </Field.Root>
        </Fieldset.Content>
        <Button type="submit" minWidth="100%" onClick={handleLogin}>
          Log in
        </Button>
        <Button type="submit" minWidth="100%" onClick={handleLogin}>
          Log in with <FaGoogle></FaGoogle>
        </Button>
      </Fieldset.Root>
    </>
  );
};

export default Login;
