import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import BaseStatCard from "../common/BaseStatCard";
import { getDateString } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

export default function CountryConflicts({ conflicts }) {
  const navigate = useNavigate();
  return (
    <SimpleGrid minChildWidth={300} spacing={3} width="100%">
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
            label={displayName}
            value={`${(
              Math.floor(totalCasualties / 10) * 10
            ).toLocaleString()}${totalCasualties / 10 > 1 ? "+" : ""}`}
            info={`${getDateString(startDate)} - ${
              endDate ? getDateString(endDate) : "Ongoing"
            }`}
            note="Click to view more"
            st={{ cursor: "pointer" }}
            onClick={() => navigate(`/${uri}`)}
          />
        );
      })}
    </SimpleGrid>
  );
}
