import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import ConflictCard from "../conflict/ConflictCard";

export default function LocationConflicts({ location: { conflicts } }) {
  return (
    <Box ml="10px">
      {conflicts.length > 0 && (
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {conflicts.map((c, key) => (
            <ConflictCard key={key} conflict={c} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
