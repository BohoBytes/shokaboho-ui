import React from "react";
import { Flex, WrapItem } from "@chakra-ui/react";

export default function WithSideBar({
  menuChildren,
  contentChildren,
  menuPosition = "left",
}) {
  return (
    <Flex
      gap={2}
      justifyContent="center"
      flexWrap="wrap"
      mb={10}
      minW={350}
      width={["100%", "100%", "100%"]}
      flexDirection={
        menuPosition === "right"
          ? ["column", "column", "row-reverse"]
          : ["column", "column", "row"]
      }
    >
      <WrapItem width={["100%", "100%", "25%"]}>{menuChildren}</WrapItem>
      <WrapItem width={["100%", "100%", "73%"]}>{contentChildren}</WrapItem>
    </Flex>
  );
}
