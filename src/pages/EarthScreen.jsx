import React, { useEffect, useState } from "react";
import Main from "../components/layout/Main";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { getAllContinents } from "../lib/appwrite";
import BaseCard from "../components/common/BaseCard";
import db from "../lib/db";
import { Query } from "appwrite";
import { flatMapDeep, partition, uniq } from "lodash";
import {
  getConflictsPerCountry,
  getContinentsWithCountries,
} from "../lib/utils";

export default function EarthScreen() {
  const [continents, setContinents] = useState([]);
  const [conflicts, setConflicts] = useState([]);

  const init = async () => {
    // get conflicts list
    const conflicts = await db.conflicts.list([
      Query.orderDesc("deaths"),
      Query.limit(100),
    ]);
    setConflicts(conflicts.documents);

    // get continents info
    const continents = await getAllContinents();
    setContinents(continents);
  };

  useEffect(() => {
    init();
  }, []);

  const conflictsByCountry = getConflictsPerCountry(conflicts);
  const contientsWithCountries = getContinentsWithCountries(continents);

  // merge conflict data into continets dictionary
  contientsWithCountries.map((continent) => {
    continent.countries.map((country) => {
      country.conflicts = conflictsByCountry[country.iso2];
    });
    continent.uniqueConflicts = uniq(
      flatMapDeep(continent.countries, "conflicts")
    ).filter(Boolean);
  });

  // show only continents that have any conflicts
  const [continentsWithConflicts] = partition(
    continents,
    (continent) => continent.uniqueConflicts.length
  );

  return (
    <Main>
      <Box px={10} width="100%" mb={10}>
        <Heading textAlign="center" my={10}>
          Mother Earth 🌍
        </Heading>
        <SimpleGrid minChildWidth={300} spacing={3} width="100%">
          {continentsWithConflicts.map(({ name, uniqueConflicts }, key) => (
            <BaseCard
              key={key}
              title={name}
              note="click for more"
              st={{ cursor: "pointer" }}
              onClick={() => console.log("clicked")}
            >
              <Text fontSize="5xl" textAlign="center">
                {uniqueConflicts.length}
              </Text>
              <Text fontSize="sm" textAlign="center">
                Conflicts
              </Text>
            </BaseCard>
          ))}
        </SimpleGrid>
      </Box>
    </Main>
  );
}
