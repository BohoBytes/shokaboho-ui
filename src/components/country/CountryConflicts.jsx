import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import BaseStatCard from "../common/BaseStatCard";
import { getDateString } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

export default function CountryConflicts({ conflicts }) {
  const navigate = useNavigate();
  return (
    <SimpleGrid columns={[1, 2]} spacing={3} minChildWidth={350} flexGrow={1}>
      {conflicts.map((conflict, key) => {
        const {
          uri,
          displayName,
          startDate,
          endDate,
          deaths,
          arrests,
          injured,
          missing,
        } = conflict;
        const totalCasualties = deaths + arrests + injured + missing;
        return (
          <BaseStatCard
            key={key}
            label={displayName}
            value={`${(
              Math.floor(totalCasualties / 10) * 10
            ).toLocaleString()}${totalCasualties / 10 > 1 ? "+" : ""}`}
            info="casualties"
            note={
              <Box py={2} as="span">
                {`${getDateString(startDate)} - ${
                  endDate ? getDateString(endDate) : "Ongoing"
                }`}
              </Box>
            }
            st={{ cursor: "pointer" }}
            onClick={() => navigate(`/${uri}`)}
          />
        );
      })}
    </SimpleGrid>
  );
}
