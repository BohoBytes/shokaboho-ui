import { Center, Flex, Spinner, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TagCloud } from "react-tagcloud";
import { getImage } from "../lib/cloudinary";
import { AdvancedImage } from "@cloudinary/react";
import db from "../lib/db";
import { Query } from "appwrite";

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
  const [conflicts, setConflicts] = useState([]);

  const init = async () => {
    const response = await db.conflicts.list([
      Query.orderDesc("deaths"),
      Query.limit(50),
    ]);
    setConflicts(response.documents);
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
        {showLogo && (
          <AdvancedImage
            cldImg={getImage("shokaboho_logo1", {
              height: 100,
              width: 100,
              radius: 100,
            })}
            height="100"
            width="100"
          />
        )}
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
