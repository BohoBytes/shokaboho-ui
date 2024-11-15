import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { HiHome } from "react-icons/hi";
import { IoEarth } from "react-icons/io5";
import { getAllContinents } from "../../lib/appwrite";
import { getCountryInfo } from "../../lib/utils";

export default function Crumbs() {
  const { pathname } = useLocation();
  const paths = pathname.split("/");
  const { continentCode } = useParams();
  const { countryCode } = useParams();

  const [continentInfo, setContinentInfo] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    const init = async () => {
      const continents = await getAllContinents();

      if (continentCode) {
        const continent = continents.find((c) => c.code === continentCode);
        setContinentInfo(continent);
      }

      if (countryCode) {
        const country = await getCountryInfo(countryCode);
        setCountryInfo(country);

        const continent = continents.find(
          (c) => c.code === country.continentCode
        );
        setContinentInfo(continent);
      }
    };
    init();
  }, []);

  const crumbs = paths
    .map((path) => {
      switch (path) {
        case "":
          return { label: <HiHome />, to: "/" };
        case "w":
          return { label: <IoEarth />, to: "/w" };
        case "c":
          return {
            label: continentInfo?.name,
            to: `/w/${continentInfo?.code}`,
          };
        default:
          return {
            label:
              continentCode === path ? continentInfo?.name : countryInfo?.flag,
            to: "#",
          };
      }
    })
    .filter(Boolean);

  if (!pathname || pathname === "/") {
    return null;
  }

  return (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="teal" />}>
      {crumbs.map((crumb, index) => (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink
            as={Link}
            to={`${crumb.to}`}
            color="teal"
            fontSize="s"
          >
            {crumb.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
