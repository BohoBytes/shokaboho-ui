import React from "react";
import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import Crumbs from "./Crumbs";
import MainMenu from "../common/MainMenu";
import { getAvatarInitials } from "../../lib/appwrite";

export default function Header() {
  const { current } = useAuth();
  const navigate = useNavigate();
  const userInitials = getAvatarInitials(current?.name);

  return (
    <Flex
      pl={2}
      height={50}
      justifyContent="space-between"
      alignItems={"center"}
      flexDirection="row-reverse"
    >
      <>
        {current ? (
          <Flex alignItems="center">
            <Text fontSize="xs" fontWeight={700} mr={2}>
              {current ? `${current.name}` : ""}
            </Text>
            <Avatar size="sm" src={userInitials} />
            <MainMenu />
          </Flex>
        ) : (
          <Button
            size="xs"
            colorScheme="teal"
            variant="ghost"
            onClick={() => navigate("/auth")}
          >
            Login
          </Button>
        )}
      </>
      <Crumbs />
    </Flex>
  );
}
