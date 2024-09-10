import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import db from "../lib/db";
import { Query } from "appwrite";
import Main from "../components/layout/Main";
import CountryInfo from "../components/country/CountryInfo";
import CountryConflicts from "../components/country/CountryConflicts";
import { getCountryInfo } from "../lib/utils";
import WithSideBar from "../components/layout/WithSideBar";

export default function CountryScreen() {
  const { countryCode } = useParams();
  const [countryInfo, setCountryInfo] = useState(null);
  const navigate = useNavigate();

  const init = async (countryCode) => {
    await db.countries
      .list([Query.equal("code", countryCode)])
      .then(async (res) => {
        const loc = res.documents[0];
        if (!loc) {
          navigate("/error/not-found");
          return;
        }
        const cI = await getCountryInfo(countryCode);
        setCountryInfo({ ...res.documents[0], ...cI });
      });
  };

  useEffect(() => {
    init(countryCode);
  }, [countryCode]);

  const { name, flag } = countryInfo || {};

  return (
    <Main>
      {!countryInfo && <Spinner size="md" color="teal" />}
      {countryInfo && (
        <Box px={10} width="100%">
          <Heading textAlign="center" my={10}>
            {name} {flag}
          </Heading>
          <WithSideBar
            menuChildren={<CountryInfo country={countryInfo} />}
            contentChildren={
              <CountryConflicts conflicts={countryInfo.conflicts} />
            }
          />
        </Box>
      )}
    </Main>
  );
}
