import React, { useEffect, useState } from "react";
import Main from "../components/layout/Main";
import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import BaseCard from "../components/common/BaseCard";
import db from "../lib/db";
import { Query } from "appwrite";
import { getContinentsWithConflicts } from "../lib/utils";
import { useNavigate, useParams } from "react-router-dom";
import ContinentGlobeIcon from "../components/contient/ContinentGlobeIcon";

export default function ContinentScreen() {
  const { continentCode } = useParams();
  const navigate = useNavigate();

  const [continentInfo, setContinentInfo] = useState(null);
  const [conflictedCountries, setConflictedCountries] = useState(null);

  const init = async () => {
    // get conflicts list
    const conflicts = await db.conflicts.list([
      Query.orderDesc("deaths"),
      Query.limit(100),
    ]);

    const { conflicted } = await getContinentsWithConflicts(
      conflicts.documents
    );
    const continentInfo = conflicted.find((c) => c.code === continentCode);

    setContinentInfo(continentInfo);
    setConflictedCountries(continentInfo?.countries.filter((c) => c.conflicts));
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Main>
      {!conflictedCountries && <Spinner size="md" color="teal" />}
      {conflictedCountries && (
        <Box px={10} width="100%" mb={10}>
          <Center my={10}>
            <Heading>{continentInfo?.name}</Heading>
            <ContinentGlobeIcon
              code={continentCode}
              size={35}
              style={{ marginLeft: 10 }}
            />
          </Center>
          <SimpleGrid minChildWidth={300} spacing={3} width="100%">
            {conflictedCountries?.map(({ name, iso2, conflicts }, key) => (
              <BaseCard
                key={key}
                title={name}
                st={{ cursor: "pointer" }}
                onClick={() => navigate(`/w/c/${iso2}`)}
              >
                <Text fontSize="5xl" textAlign="center">
                  {conflicts?.length}
                </Text>
                <Text fontSize="sm" textAlign="center">
                  Conflicts
                </Text>
              </BaseCard>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Main>
  );
}
