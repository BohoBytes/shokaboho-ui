import React from "react";
import { AbsoluteCenter, Box, Flex, Link, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function Footer() {
  return (
    <Box position="relative" height="70px" fontSize="xs">
      <Flex height="100%" alignItems="center" justifyContent="flex-end">
        <Link href="/privacy.html" mx={2}>
          Privacy
        </Link>
        |
        <Link href="/deletion.html" mx={2}>
          Data
        </Link>
        |
        <Link href="#" mx={2}>
          Contact
        </Link>
      </Flex>
      <AbsoluteCenter textAlign="center">
        <Text color="teal" fontWeight="500">
          Made with ❤️ by{" "}
          <Link href="https://bohobytes.com" isExternal>
            BohoBytes
          </Link>
        </Text>
      </AbsoluteCenter>
    </Box>
  );
}
