import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Field, Input, InputGroup, Fieldset, Stack, HStack, Button } from "@chakra-ui/react";
import timer from "@/utils/popuptimer";
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

  const handleSignUp = (e) => {};

  const handleGoogleSignUp = (e) => {
    
  }

  return (
    <>
      {success.occurrred && (
        <SuccessAlert message={success.message}></SuccessAlert>
      )}
      {error.occurrred && <ErrorAlert message={error.message}></ErrorAlert>}
     
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
          <Button>Sign Up With <FaGoogle></FaGoogle> </Button>
        </Fieldset.Root>
     
    </>
  );
};

export default Signup;
