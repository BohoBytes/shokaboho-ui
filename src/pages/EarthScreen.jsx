import React, { useEffect, useState } from "react";
import Main from "../components/layout/Main";
import { Box, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { getAllContinents } from "../lib/appwrite";
import BaseCard from "../components/common/BaseCard";
import db from "../lib/db";
import { Query } from "appwrite";
import { getContinentsWithConflicts } from "../lib/utils";
import { useNavigate } from "react-router-dom";

export default function EarthScreen() {
  const navigate = useNavigate();
  const [continentsWithConflicts, setContinentsWithConflicts] = useState(null);

  const init = async () => {
    // get conflicts list
    const conflicts = await db.conflicts.list([
      Query.orderDesc("deaths"),
      Query.limit(100),
    ]);

    const { conflicted } = await getContinentsWithConflicts(
      conflicts.documents
    );
    setContinentsWithConflicts(conflicted);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Main>
      {!continentsWithConflicts && <Spinner size="md" color="teal" />}
      {continentsWithConflicts && (
        <Box px={10} width="100%" mb={10}>
          <Heading textAlign="center" my={10}>
            Mother Earth 🌍
          </Heading>
          <SimpleGrid minChildWidth={300} spacing={3} width="100%">
            {continentsWithConflicts.map(
              ({ name, code, uniqueConflicts }, key) => (
                <BaseCard
                  key={key}
                  title={name}
                  st={{ cursor: "pointer" }}
                  onClick={() => navigate(`/w/${code}`)}
                >
                  <Text fontSize="5xl" textAlign="center">
                    {uniqueConflicts.length}
                  </Text>
                  <Text fontSize="sm" textAlign="center">
                    Conflicts
                  </Text>
                </BaseCard>
              )
            )}
          </SimpleGrid>
        </Box>
      )}
    </Main>
  );
}
