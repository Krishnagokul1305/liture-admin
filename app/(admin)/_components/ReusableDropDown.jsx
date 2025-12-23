"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

function ReusableDropDown({ trigger, label, items }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        {items.map((item, index) =>
          item.separator ? (
            <DropdownMenuSeparator key={index} />
          ) : (
            <DropdownMenuItem key={index} onClick={item.onClick}>
              {item.label}
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ReusableDropDown;

// const dropdownItems = [
//   { label: "Profile", onClick: handleAction("Profile clicked") },
//   { label: "Settings", onClick: handleAction("Settings clicked") },
//   { separator: true },
//   { label: "Logout", onClick: handleAction("Logged out") },
// ];

// <ReusableDropDown
//   label="User Menu"
//   trigger={<Button>Open Menu</Button>}
//   items={dropdownItems}
// />;
