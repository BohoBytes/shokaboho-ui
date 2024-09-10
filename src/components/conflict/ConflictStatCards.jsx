import React from "react";
import { SimpleGrid, Text } from "@chakra-ui/react";
import BaseCard from "../common/BaseCard";

export default function ConflictStatCards({ conflict }) {
  const casualties = [
    { type: "deaths", bg: "red", color: "white", value: conflict.deaths },
    { type: "injured", bg: "red.900", color: "white", value: conflict.injured },
    {
      type: "arrests",
      bg: "gray.700",
      color: "white",
      value: conflict.arrests,
    },
    {
      type: "missing",
      bg: "purple.900",
      color: "white",
      value: conflict.missing,
    },
  ];
  return (
    <SimpleGrid minChildWidth={180} spacing={3} my={10}>
      {casualties.map(({ type, bg, color, value }, key) => (
        <BaseCard
          key={key}
          title={type[0].toUpperCase() + type.substring(1)}
          bg={bg}
          color={color}
          shadow="dark-lg"
        >
          <Text fontSize="4xl" textAlign="center">
            {`${(Math.floor(value / 10) * 10).toLocaleString()}${
              value / 10 > 1 ? "+" : ""
            }`}
          </Text>
        </BaseCard>
      ))}
    </SimpleGrid>
  );
}
