import {
  Accordion,
  Box,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
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

          <Flex my={10} justifyContent="flex-start">
            <ConflictInfo conflict={conflictInfo} />
            <ConflictDescription conflict={conflictInfo} />
          </Flex>

          <ConflictStatCards conflict={conflictInfo} />
        </Box>
      )}
    </Main>
  );
}
