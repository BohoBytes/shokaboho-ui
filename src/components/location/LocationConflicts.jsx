import React from "react";
import { Box, Flex, SimpleGrid, Wrap, WrapItem } from "@chakra-ui/react";
import ConflictCard from "../conflict/ConflictCard";

export default function LocationConflicts({ location: { conflicts } }) {
  return (
    <Flex flexWrap="wrap" width="100%" ml={3}>
      {conflicts.length > 0 && (
        <SimpleGrid
          spacing={5}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          width={"100%"}
        >
          {conflicts.map((c, key) => (
            <ConflictCard key={key} conflict={c} />
          ))}
        </SimpleGrid>
      )}
    </Flex>
  );
}
