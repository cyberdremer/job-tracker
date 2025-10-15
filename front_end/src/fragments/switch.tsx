import { Heading, HStack, Switch } from "@chakra-ui/react";

interface SwitchControlProps {
  toggled: boolean;
  setToggle: (value: boolean) => void;
  headingTitle: string;
}

const SwitchControl = ({
  toggled,
  setToggle,
  headingTitle,
}: SwitchControlProps) => {
  return (
    <>
      <Switch.Root
        checked={toggled}
        onCheckedChange={() => setToggle(!toggled)}
      >
        <Switch.HiddenInput></Switch.HiddenInput>
        <Switch.Control>
          <Switch.Thumb></Switch.Thumb>
        </Switch.Control>
        <Switch.Label>{headingTitle}</Switch.Label>
      </Switch.Root>
    </>
  );
};

export default SwitchControl;
