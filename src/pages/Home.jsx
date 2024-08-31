import React, { useEffect, useState } from "react";
import { Box, Center } from "@chakra-ui/react";
import { useAuth } from "../auth/useAuth";
import Landing from "./Landing";
import Header from "../components/layout/Header";
import { useNavigate, useParams } from "react-router-dom";
import Conflict from "./Conflict";
import db from "../lib/db";
import { Query } from "appwrite";

export default function Home() {
  const navigate = useNavigate();
  const { current } = useAuth();
  const { conflict, location } = useParams();
  const [conflictInfo, setConflictInfo] = useState(null);

  const init = async (conflict) => {
    if (conflict) {
      console.log(conflict);
      const conflictInfo = await db.conflicts
        .list([Query.equal("uri", [conflict]), Query.limit(1)])
        .then((res) => res.documents[0]);

      console.log(conflictInfo);

      if (!conflictInfo) {
        navigate("/not-found");
        return;
      } else {
        setConflictInfo(conflictInfo);
      }
    }
  };

  useEffect(() => {
    init(conflict);
  }, [conflict]);

  console.log("Home");

  return (
    <Box>
      <Header />
      <Center height="100vh" bg="#d5d5d3">
        {conflictInfo ? (
          <Conflict showLogo={!current} conflictInfo={conflictInfo} />
        ) : (
          <Landing showLogo={!current} location={location} />
        )}
      </Center>
    </Box>
  );
}
