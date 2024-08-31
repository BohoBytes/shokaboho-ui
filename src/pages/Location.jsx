import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import db from "../lib/db";
import { Query } from "appwrite";
import Main from "../components/layout/Main";
import LocationInfo from "../components/location/LocationInfo";
import LocationConflicts from "../components/location/LocationConflicts";

export default function Region() {
  const { location } = useParams();
  const [locationInfo, setLocationInfo] = useState(null);
  const navigate = useNavigate();

  const init = async (location) => {
    await db.countries.list([Query.equal("code", location)]).then((res) => {
      const loc = res.documents[0];
      if (!loc) {
        navigate("/error/not-found");
        return;
      }
      setLocationInfo(res.documents[0]);
    });
  };

  useEffect(() => {
    init(location);
  }, [location]);

  return (
    <Main>
      {!locationInfo && <Spinner size="md" color="teal" />}
      {locationInfo && (
        <Box px={10} width="100%">
          <Heading textAlign="center" my={3}>
            Conflicts of {locationInfo.name}
          </Heading>

          <Flex my={10} justifyContent="flex-start">
            <LocationInfo location={locationInfo} />
            <LocationConflicts location={locationInfo} />
          </Flex>
        </Box>
      )}
    </Main>
  );
}
