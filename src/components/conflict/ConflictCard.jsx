import React from "react";
import { Box, Flex, Stat, StatLabel } from "@chakra-ui/react";
import { StatNumber } from "@chakra-ui/react";
import { StatHelpText } from "@chakra-ui/react";
import BaseCard from "../common/BaseCard";
import { getDateString } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

export default function ConflictCard({
  conflict: {
    uri,
    displayName,
    startDate,
    endDate,
    deaths,
    arrests,
    injured,
    missing,
  },
}) {
  const navigate = useNavigate();
  const totalCasualties = deaths + arrests + injured + missing;
  return (
    <Flex
      onClick={() => navigate(`/${uri}`)}
      style={{ cursor: "pointer" }}
      width="100%"
    >
      <BaseCard>
        <Stat>
          <StatLabel>{displayName}</StatLabel>
          <StatNumber>{`${(
            Math.floor(totalCasualties / 10) * 10
          ).toLocaleString()}${
            totalCasualties / 10 > 1 ? "+" : ""
          }`}</StatNumber>
          <StatHelpText>
            {`${getDateString(startDate)} - ${
              endDate ? getDateString(endDate) : "Ongoing"
            }`}
          </StatHelpText>
        </Stat>
      </BaseCard>
    </Flex>
  );
}
