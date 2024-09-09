import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import db from "../lib/db";
import { Query } from "appwrite";
import Main from "../components/layout/Main";
import LocationInfo from "../components/location/LocationInfo";
import LocationConflicts from "../components/location/LocationConflicts";
import { getCountryInfo } from "../lib/utils";

export default function Region() {
  const { location } = useParams();
  const [locationInfo, setLocationInfo] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);
  const navigate = useNavigate();

  const init = async (location) => {
    await db.countries
      .list([Query.equal("code", location)])
      .then(async (res) => {
        const loc = res.documents[0];
        if (!loc) {
          navigate("/error/not-found");
          return;
        }
        setLocationInfo(res.documents[0]);
        setCountryInfo(await getCountryInfo(location));
      });
  };

  useEffect(() => {
    init(location);
  }, [location]);

  const { name, flag } = countryInfo || {};

  return (
    <Main>
      {!locationInfo && <Spinner size="md" color="teal" />}
      {locationInfo && (
        <Box px={10} width="100%">
          <Heading textAlign="center" my={3}>
            {name} {flag}
          </Heading>

          <Flex my={10} justifyContent="flex-start" width="100%">
            <Box width="25%" minW={185}>
              <LocationInfo location={locationInfo} />
            </Box>
            <Box width="74%">
              <LocationConflicts location={locationInfo} />
            </Box>
          </Flex>
        </Box>
      )}
    </Main>
  );
}
