import React from "react";
import { Button, Box, Flex } from "@chakra-ui/react";
import { useAuth } from "../auth/useAuth";
import Landing from "./Landing";
import Logo from "../comps/Logo";

export default function Home() {
  const { current, logout } = useAuth();

  return (
    <Box>
      {current && (
        <Flex
          width="100%"
          justifyContent="flex-end"
          p={5}
          alignItems="center"
          height="70px"
        >
          <Box mr="auto">
            <Logo height={60} width={60} radius={100} />
          </Box>
          <Box fontSize="sm" alignSelf="center" mr={30}>
            Welcome, {current.name}
          </Box>
          <Button colorScheme="teal" variant="link" onClick={() => logout()}>
            Logout
          </Button>
        </Flex>
      )}
      <Landing showLogo={false} />
    </Box>
  );
}
