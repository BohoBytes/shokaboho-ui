import React from "react";
import { Flex, Text, WrapItem } from "@chakra-ui/react";
import BaseCard from "../common/BaseCard";

export default function ConflictStatCards({ conflict }) {
  const casualties = [
    { type: "deaths", bg: "red", color: "white" },
    { type: "injured", bg: "red.900", color: "white" },
    { type: "arrests", bg: "gray.700", color: "white" },
    { type: "missing", bg: "purple.900", color: "white" },
  ];
  return (
    <Flex
      textAlign="center"
      flexWrap="wrap"
      gap={3}
      my={10}
      justifyContent="center"
    >
      {casualties.map(({ type, bg, color }, key) => (
        <WrapItem key={key} width="24%" minW="180px">
          <BaseCard
            key={key}
            title={type[0].toUpperCase() + type.substring(1)}
            bg={bg}
            color={color}
            shadow="dark-lg"
          >
            {
              <Text fontSize="4xl" textAlign="center">
                {`${(Math.floor(conflict[type] / 10) * 10).toLocaleString()}${
                  conflict[type] / 10 > 1 ? "+" : ""
                }`}
              </Text>
            }
          </BaseCard>
        </WrapItem>
      ))}
    </Flex>
  );
}
