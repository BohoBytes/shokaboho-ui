import React, { useEffect, useState } from "react";
import BaseCard from "../common/BaseCard";
import SingleAccordionItem from "../common/SingleAccordionItem";
import { FaHandPointRight } from "react-icons/fa";
import { Accordion, Box, List, ListIcon, ListItem } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { getCountryInfo } from "../../lib/utils";

const CountryInfoSigleItem = ({ title, value }) => (
  <ListItem fontSize="sm">
    <ListIcon as={MdCheckCircle} color="green.500" />
    <Box display="inline-flex">
      {title}: {value}
    </Box>
  </ListItem>
);

export default function LocationInfo({ location: { code, altNames } }) {
  const [countryInfo, setCountryInfo] = useState({});

  const init = async () => {
    setCountryInfo(await getCountryInfo(code));
  };

  useEffect(() => {
    init();
  }, []);

  console.log(countryInfo);

  const { continent, codes, languages, capital, currencies, phone } =
    countryInfo;

  return (
    <BaseCard>
      <List spacing={2}>
        {continent && (
          <CountryInfoSigleItem title="Continent" value={continent} />
        )}
        {capital && <CountryInfoSigleItem title="Capital" value={capital} />}
        {phone && <CountryInfoSigleItem title="Phone Code" value={phone[0]} />}
      </List>

      {languages && (
        <Accordion defaultIndex={[0]} allowToggle my={3}>
          <SingleAccordionItem
            title="Languages"
            data={languages.map(({ name, nativeName }) => ({
              value: name + " (" + nativeName + ")",
              icon: FaHandPointRight,
              color: "green.500",
            }))}
          />
        </Accordion>
      )}

      {currencies && (
        <Accordion defaultIndex={[0]} allowToggle my={3}>
          <SingleAccordionItem
            title="Curencies"
            data={currencies.map(({ name, symbolNative }) => ({
              value: name + " (" + symbolNative + ")",
              icon: FaHandPointRight,
              color: "green.500",
            }))}
          />
        </Accordion>
      )}

      {codes && (
        <Accordion defaultIndex={[0]} allowToggle my={3}>
          <SingleAccordionItem
            title="Country Codes"
            data={[
              {
                value: `ISO2: ${codes.iso2}`,
                icon: FaHandPointRight,
                color: "green.500",
              },
              {
                value: `ISO3: ${codes.iso3}`,
                icon: FaHandPointRight,
                color: "green.500",
              },
            ]}
          />
        </Accordion>
      )}

      {altNames.length > 0 && (
        <Accordion defaultIndex={[0]} allowToggle my={3}>
          <SingleAccordionItem
            title="Alternative Names"
            data={altNames.map((name) => ({
              value: name,
              icon: FaHandPointRight,
              color: "green.500",
            }))}
          />
        </Accordion>
      )}
    </BaseCard>
  );
}
