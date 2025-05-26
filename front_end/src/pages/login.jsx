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
const Login = ({}) => {
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

  const handleLogin = async(e) => {};

  const handleGoogleLogin = (e) => {}

  return (
    <>
      {success.occurred && (
        <SuccessAlert message={success.message}></SuccessAlert>
      )}
      {error.occurred && <ErrorAlert message={error.message}></ErrorAlert>}
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
