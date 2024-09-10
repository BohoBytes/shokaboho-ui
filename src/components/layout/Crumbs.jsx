import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { HiHome } from "react-icons/hi";
import { IoEarth } from "react-icons/io5";

export default function Crumbs() {
  const { pathname } = useLocation();
  const paths = pathname.split("/");
  const crumbs = paths
    .map((path) => {
      switch (path) {
        case "":
          return { label: <HiHome />, to: "/" };
        case "l":
          return { label: <IoEarth />, to: "/world" };
        default:
          return { label: path, to: "#" };
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
            fontSize="xs"
          >
            {crumb.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
