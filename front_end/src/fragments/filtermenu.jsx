import { Menu, For, Portal } from "@chakra-ui/react";
import MenuGeneric from "@/genericcomponents/menugeneric";
import { LuChevronRight } from "react-icons/lu";
const filterOptions = [
  {
    name: "Salary",
    nested: ["Lowest", "Highest"],
  },
  {
    name: "Status",
    nested: [
      "Applying",
      "Interviewing",
      "Rejected",
      "Accepted",
      "Closed",
      "Awaiting",
      "Applied",
    ],
  },
  {
    name: "Date Applied",
    nested: ["Oldest", "Recent"],
  },
];

const FilterMenu = ({
  onStatus,
  onSalaryAsc,
  onSalaryDesc,
  onDateAsc,
  onDateDesc,
}) => {
  const handleMenuClick = (option, item) => {
    switch (option.name) {
      case "Date Applied":
        item === "Oldest" ? onDateDesc() : onDateAsc();
        break;
      case "Salary":
        item === "Lowest" ? onSalaryDesc() : onSalaryAsc();
        break;
      case "Status":
        onStatus(item);
        break;
      default:
        throw new Error(`Invalid choice`);
    }
  };
  return (
    <>
      <MenuGeneric buttonMessage={"Filter"}>
        <Menu.Positioner>
          <Menu.Content>
            {filterOptions.map((option) => (
              <Menu.Root positioning={{ gutter: 2 }} key={option.name}>
                <Menu.TriggerItem>
                  Filter {option.name} <LuChevronRight></LuChevronRight>
                </Menu.TriggerItem>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      {option.nested.map((item) => (
                        <Menu.Item
                          key={item}
                          value={`${item}`}
                          onClick={() => handleMenuClick(option, item)}
                        >
                          {item}
                        </Menu.Item>
                      ))}
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </MenuGeneric>
    </>
  );
};

export default FilterMenu;
