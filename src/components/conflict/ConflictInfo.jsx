import React from "react";
import BaseCard from "../common/BaseCard";
import { Accordion } from "@chakra-ui/react";
import SingleAccordionItem from "../common/SingleAccordionItem";
import { MdAccessTime } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { FaHandPointRight } from "react-icons/fa";
import { IoMdGlobe } from "react-icons/io";
import { get } from "lodash";
import { getDateString } from "../../lib/utils";

export default function ConflictInfo({
  conflict: { startDate, endDate, altNames, countries },
}) {
  return (
    <BaseCard w="25%">
      <Accordion defaultIndex={[0, 1]} allowMultiple>
        <SingleAccordionItem
          title="Time Period"
          data={[
            {
              value: `Start: ${getDateString(startDate)}`,
              color: "orange.500",
              icon: MdAccessTime,
            },
            {
              value: `End: ${getDateString(endDate) || "Ongoing"}`,
              color: "orange.500",
              icon: IoTime,
            },
          ].filter(Boolean)}
        />
        {countries && (
          <SingleAccordionItem
            title="Effected Locations"
            data={countries.map(({ code }) => ({
              value: code,
              icon: IoMdGlobe,
              color: "green.500",
              link: `/l/${code}`,
            }))}
          />
        )}
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
