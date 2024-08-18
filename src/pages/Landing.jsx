import { Center, Flex, Spinner, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TagCloud } from "react-tagcloud";
import db from "../lib/db";
import { Query } from "appwrite";
import { pick } from "lodash";
import { useParams } from "react-router-dom";
import Logo from "../comps/Logo";

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

export default function Landing({ showLogo = true }) {
  const { location } = useParams();
  const [conflicts, setConflicts] = useState([]);

  const init = async () => {
    let conflictList = [];
    if (!location) {
      conflictList = await db.conflicts
        .list([Query.orderDesc("deaths"), Query.limit(50)])
        .then((res) => res.documents);
    } else {
      const countryInfo = await db.countries
        .list([Query.equal("code", location)])
        .then((res) => res.documents[0]);

      conflictList = countryInfo.conflicts.map((c) => {
        const conflict = pick(c, [
          "displayName",
          "deaths",
          "injured",
          "missing",
          "arrests",
        ]);
        return conflict;
      });
    }

    setConflicts(conflictList);
  };

  useEffect(() => {
    init();
  }, []);

  const tagData = conflicts.map((c) => ({
    value: c.displayName,
    count: c.deaths + c.injured + c.missing + c.arrests,
  }));

  return (
    <Center height="100vh" bg="#d5d5d3">
      <Stack alignItems="center">
        {showLogo && <Logo height={100} width={100} radius={100} />}
        {conflicts && (
          <Flex
            width="50%"
            p={30}
            textAlign="center"
            textShadow="1px 0px 1px dimgrey"
            bg={"#f5f5f5"}
            borderRadius={20}
          >
            {tagData.length == 0 && <Spinner size="md" color="teal" />}
            <TagCloud
              minSize={12}
              maxSize={35}
              tags={tagData}
              onClick={(tag) => console.log(tag)}
              renderer={CustomRenderer}
            />
          </Flex>
        )}
      </Stack>
    </Center>
  );
}
