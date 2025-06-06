"use client";
import {
  Portal,
  For,
  Select,
  Stack,
  createListCollection,
} from "@chakra-ui/react";
const GenericSelect = ({
  selectItems,
  placeHolder,
  label,
  handleClick,
  name,
  value,
}) => {
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
