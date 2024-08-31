import React from "react";
import BaseCard from "../common/BaseCard";
import SingleAccordionItem from "../common/SingleAccordionItem";
import { FaHandPointRight } from "react-icons/fa";
import { Accordion, Box, Center, Text } from "@chakra-ui/react";
import Flag from "react-flagkit";

export default function LocationInfo({ location: { code, altNames } }) {
  return (
    <BaseCard w="25%">
      <Center flexDirection="row" mb={4}>
        <Text fontSize="2xl">{code}</Text>
        <Box mx={2}>
          <Flag country={code} />
        </Box>
      </Center>
      <Accordion defaultIndex={[0]} allowMultiple>
        {altNames.length > 0 && (
          <SingleAccordionItem
            title="Alternative Names"
            data={altNames.map((name) => ({
              value: name,
              icon: FaHandPointRight,
              color: "green.500",
            }))}
          />
        )}
      </Accordion>
    </BaseCard>
  );
}
