import { Box, Center, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TagCloud } from "react-tagcloud";
import db from "../lib/db";
import { Query } from "appwrite";
import { useNavigate, useParams } from "react-router-dom";
import Main from "../components/layout/Main";
import BaseCard from "../components/common/BaseCard";

const CustomRenderer = (tag, size, color) => (
  <span
    key={tag.value}
    style={{
      animation: "blinker 3s linear infinite",
      animationDelay: `${Math.random() * 2}s`,
      display: "inline-block",
      color: color,
      fontSize: size,
      padding: "2px",
      margin: "2px",
      cursor: "pointer",
    }}
  >
    {tag.value}
  </span>
);

export default function Landing() {
  const navigate = useNavigate();
  const { location } = useParams();
  const [conflicts, setConflicts] = useState(null);

  const init = async (loc) => {
    if (!loc) {
      await db.conflicts
        .list([Query.orderDesc("deaths"), Query.limit(50)])
        .then((res) => setConflicts(res.documents || []));
    } else {
      await db.countries.list([Query.equal("code", loc)]).then((res) => {
        const conflictInfo = res.documents[0]?.conflicts;
        if (!conflictInfo) {
          navigate("/error/not-found");
          return;
        }
        setConflicts(conflictInfo);
      });
    }
  };

  useEffect(() => {
    init(location);
  }, [location]);

  if (conflicts && conflicts.length == 0) {
    navigate("/not/found");
    return;
  }

  const tagData = conflicts?.map((c) => ({
    value: c.displayName,
    count: c.deaths + c.injured + c.missing + c.arrests,
    uri: c.uri,
  }));

  return (
    <Main>
      <Center width="100%">
        <BaseCard w="50%">
          <Box textShadow={"1px 0px 1px dimgrey"} textAlign={"center"}>
            {!tagData && <Spinner margin="auto" size="md" color="teal" />}
            {tagData?.length > 0 && (
              <TagCloud
                minSize={12}
                maxSize={35}
                tags={tagData}
                onClick={(tag) => navigate(`/${tag.uri}`)}
                renderer={CustomRenderer}
              />
            )}
          </Box>
        </BaseCard>
      </Center>
    </Main>
  );
}
