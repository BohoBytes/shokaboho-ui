import React from "react";
import { Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import BaseCard from "./BaseCard";

export default function BaseStatCard({ label, value, info, ...props }) {
  return (
    <BaseCard {...props}>
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>{value}</StatNumber>
        <StatHelpText>{info}</StatHelpText>
      </Stat>
    </BaseCard>
  );
}
