import React from "react";
import { SimpleGrid, Text } from "@chakra-ui/react";
import BaseCard from "../common/BaseCard";

export default function ConflictStatCards({
  conflict: { deaths, injured, arrests, missing },
}) {
  const casualties = [
    { type: "deaths", color: "red.500", value: deaths },
    { type: "injured", color: "purple.500", value: injured },
    { type: "arrests", color: "yellow.700", value: arrests },
    { type: "missing", color: "pink.700", value: missing },
  ];

  return (
    <SimpleGrid minChildWidth={180} spacing={2} width="100%">
      {casualties.map(({ type, color, value }, key) => (
        <BaseCard
          key={key}
          title={type[0].toUpperCase() + type.substring(1)}
          color={color}
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
