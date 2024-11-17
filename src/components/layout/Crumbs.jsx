import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { HiHome } from "react-icons/hi";
import { IoEarth } from "react-icons/io5";
import { getAllContinents } from "../../lib/appwrite";
import { getCountryInfo } from "../../lib/utils";
import { RxDividerVertical } from "react-icons/rx";

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

  const isHome = !pathname || pathname === "/";

  const crumbs = isHome
    ? [
        { label: <HiHome />, to: "/" },
        { label: <IoEarth />, to: "/w" },
      ]
    : paths
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
                  continentCode === path
                    ? continentInfo?.name
                    : countryCode === path
                    ? countryInfo?.flag
                    : path,
                to: "#",
              };
          }
        })
        .filter(Boolean);

  return (
    <Breadcrumb
      spacing="8px"
      separator={
        isHome ? (
          <RxDividerVertical color="black" />
        ) : (
          <ChevronRightIcon color="teal" />
        )
      }
    >
      {crumbs?.map(({ to, label }, index) => (
        <BreadcrumbItem
          key={index}
          isCurrentPage={!isHome && index === paths.length - 1}
        >
          <BreadcrumbLink href={`${to}`} color="teal" fontSize="md">
            {label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
