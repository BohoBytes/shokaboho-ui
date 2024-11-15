import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Main from "../components/layout/Main";
import db from "../lib/db";
import { Query } from "appwrite";
import ConflictDescription from "../components/conflict/ConflictDescription";
import ConflictInfo from "../components/conflict/ConflictInfo";
import WithSideBar from "../components/layout/WithSideBar";

export default function ConflictScreen() {
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
  const hasAltName = displayName !== name;

  return (
    <Main>
      {!conflictInfo && <Spinner size="md" color="teal" />}
      {conflictInfo && (
        <Box px={10} width="100%">
          <Heading textAlign="center" mt={10} mb={!hasAltName ? 10 : undefined}>
            {displayName}
          </Heading>

          {hasAltName && (
            <Text textAlign="center" fontSize="2xl" color="pink.800" mb={10}>
              ({name})
            </Text>
          )}

          <WithSideBar
            menuChildren={<ConflictInfo conflict={conflictInfo} />}
            contentChildren={<ConflictDescription conflict={conflictInfo} />}
          />
        </Box>
      )}
    </Main>
  );
}
