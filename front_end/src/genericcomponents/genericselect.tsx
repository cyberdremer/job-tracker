"use client";
import {
  Portal,
  For,
  Select,
  Stack,
  createListCollection,
  ListCollection,
} from "@chakra-ui/react";

interface GenericSelectProps {
  placeHolder: string;
  label: string;
  handleClick: ()
  selectItems: any
  name: string;
  value: string[];

}



const GenericSelect = ({
  selectItems,
  placeHolder,
  label,
  handleClick,
  name,
  value,
}: GenericSelectProps) => {
  return (
    <>
      <Select.Root
        collection={selectItems}
        name={name}
        value={value}
        onValueChange={handleClick}
        marginTop={4}
      >
        <Select.HiddenSelect></Select.HiddenSelect>
        <Select.Label>{label}</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder={placeHolder}></Select.ValueText>
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator></Select.Indicator>
          </Select.IndicatorGroup>
        </Select.Control>
        
          <Select.Positioner>
            <Select.Content>
              {selectItems.items.map((selectItem, index) => (
                <Select.Item
                  item={selectItem}
                  key={selectItem.value}
                  name={name}
                >
                  {selectItem.label}
                  <Select.ItemIndicator></Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        
      </Select.Root>
    </>
  );
};

export default GenericSelect;
