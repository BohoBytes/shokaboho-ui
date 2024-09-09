import { Box, Flex, Heading, Spinner, Text, WrapItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Main from "../components/layout/Main";
import db from "../lib/db";
import { Query } from "appwrite";
import ConflictDescription from "../components/conflict/ConflictDescription";
import ConflictInfo from "../components/conflict/ConflictInfo";
import ConflictStatCards from "../components/conflict/ConflictStatCards";

export default function Conflict() {
  const navigate = useNavigate();
  const { conflict } = useParams();
  const [conflictInfo, setConflictInfo] = useState(null);

  const init = async (conflict) => {
    await db.conflicts
      .list([Query.equal("uri", [conflict]), Query.limit(1)])
      .then(async (res) => {
        const conflictInfo = res.documents[0];
        if (!conflictInfo) {
          navigate("/error/not-found");
          return;
        }
        setConflictInfo(conflictInfo);
      });
  };

  useEffect(() => {
    init(conflict);
  }, [conflict]);

  const { displayName, name } = conflictInfo || {};

  return (
    <Main>
      {!conflictInfo && <Spinner size="md" color="teal" />}
      {conflictInfo && (
        <Box px={10} width="100%">
          <Heading textAlign="center" my={3}>
            {displayName}
          </Heading>

          {displayName !== name && (
            <Text textAlign="center" fontSize="md" color="pink.800">
              ({name})
            </Text>
          )}

          <ConflictStatCards conflict={conflictInfo} />

          <Flex
            gap={2}
            justifyContent="center"
            flexWrap="wrap"
            mb={10}
            minW={350}
          >
            <WrapItem width={["100%", "100%", "25%"]}>
              <ConflictInfo conflict={conflictInfo} />
            </WrapItem>
            <WrapItem width={["100%", "100%", "73%"]}>
              <ConflictDescription conflict={conflictInfo} />
            </WrapItem>
          </Flex>
        </Box>
      )}
    </Main>
  );
}
