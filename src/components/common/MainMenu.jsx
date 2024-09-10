import React from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  BODY_BG_COLOR,
  HEADER_BG_COLOR,
  HEADER_BG_LIGHT,
} from "../../lib/constants";
import { useAuth } from "../../auth/useAuth";

export default function MainMenu() {
  const { logout } = useAuth();

  return (
    <Menu gutter={4}>
      <MenuButton
        p={2}
        mx={2}
        borderRadius="md"
        _hover={{ bg: HEADER_BG_COLOR }}
        _expanded={{ bg: BODY_BG_COLOR }}
        bgColor={HEADER_BG_LIGHT}
      >
        <HamburgerIcon size={20} /> <ChevronDownIcon />
      </MenuButton>
      <MenuList fontSize="xs" minWidth="150px" justifyItems="center">
        <MenuItem bg={HEADER_BG_LIGHT} _hover={{ bg: HEADER_BG_LIGHT }}>
          Edit Profile
        </MenuItem>
        <MenuItem _hover={{ bg: HEADER_BG_LIGHT }}>Change Password</MenuItem>
        <MenuDivider />
        <MenuItem
          as={Button}
          margin="auto"
          width={20}
          color="teal"
          size="xs"
          _hover={{ bg: HEADER_BG_LIGHT }}
          onClick={() => logout()}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
