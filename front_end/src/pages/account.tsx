import { InfoContext } from "@/context/infocontext";
import { Avatar, Field, Fieldset, Input, Stack } from "@chakra-ui/react";
import { useContext } from "react";
const Account = () => {
  const { user } = useContext(InfoContext);
  return (
    <>
      <Fieldset.Root
        size="lg"
        maxW="md"
        alignSelf="center"
        animationName="fade-in"
        animationDuration="slowest"
        marginTop="3rem"
      >
        <Stack>
          <Avatar.Root alignSelf="center" size="2xl">
            <Avatar.Fallback
              name={user.fullname || "Ai Artist"}
            ></Avatar.Fallback>
          </Avatar.Root>
          <Fieldset.Legend>Account Details</Fieldset.Legend>
        </Stack>
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>
              Full Name:
              <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input
              name="fullname"
              value={user.fullname || "John"}
              disabled
            ></Input>
          </Field.Root>

          <Field.Root>
            <Field.Label>
              Email Address:
              <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input
              name="email"
              type="email"
              value={user.email || "John"}
              disabled
            ></Input>
          </Field.Root>
        </Fieldset.Content>
      </Fieldset.Root>
    </>
  );
};

export default Account;
