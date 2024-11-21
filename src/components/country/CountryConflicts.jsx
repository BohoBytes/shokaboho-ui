import React from "react";
import { SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { getDateString } from "../../lib/utils";
import { useNavigate } from "react-router-dom";
import BaseCard from "../common/BaseCard";

export default function CountryConflicts({ conflicts }) {
  const navigate = useNavigate();

  const getCasualtyString = ({ deaths, injured, arrests, missing }) => {
    const totalCasualty = deaths + injured + arrests + missing;
    const casualtyNumber = (
      Math.floor(totalCasualty / 10) * 10
    ).toLocaleString();
    const casualtyIndicator = totalCasualty / 10 > 1 ? "+" : "";
    return `${casualtyNumber}${casualtyIndicator}`;
  };

  const getConflictPeriodString = ({ startDate, endDate }) => {
    return `${getDateString(startDate)} - ${
      endDate ? getDateString(endDate) : "Ongoing"
    }`;
  };

  return (
    <SimpleGrid columns={[1, 2]} spacing={3} minChildWidth={350} flexGrow={1}>
      {conflicts.map((conflict, key) => (
        <BaseCard
          key={key}
          h="140px"
          st={{ cursor: "pointer" }}
          onClick={() => navigate(`/${conflict.uri}`)}
        >
          <Stack gap={0}>
            <Text fontSize="sm" mb={3} fontWeight={500}>
              {getConflictPeriodString(conflict)}
            </Text>
            <Text noOfLines={1} fontSize="2xl" fontWeight={500}>
              {conflict.name}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {`${getCasualtyString(conflict)} casualties`}
            </Text>
          </Stack>
        </BaseCard>
      ))}
    </SimpleGrid>
  );
}
