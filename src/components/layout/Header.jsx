import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useAuth } from "../../auth/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { HiHome } from "react-icons/hi2";

const AuthButton = ({ label, variant, onClick }) => {
  return (
    <Button size="xs" colorScheme="teal" variant={variant} onClick={onClick}>
      {label}
    </Button>
  );
};

export default function Header() {
  const { current, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const paths = pathname.split("/");
  const crumbs = paths
    .map((path) => {
      switch (path) {
        case "":
          return { label: <HiHome />, to: "/" };
        case "l":
          return undefined;
        default:
          return { label: path, to: "#" };
      }
    })
    .filter(Boolean);

  return (
    <Flex
      px={2}
      height={50}
      justifyContent="space-between"
      alignItems={"center"}
      flexDirection="row-reverse"
    >
      <>
        {current ? (
          <Flex alignItems="center">
            <Text fontSize="xs" mr={5}>
              {current ? `Welcome, ${current.name}` : ""}
            </Text>
            <AuthButton
              variant="solid"
              onClick={() => logout()}
              label="Logout"
            />
          </Flex>
        ) : (
          <AuthButton
            variant="ghost"
            onClick={() => navigate("/login")}
            label="Login"
          />
        )}
      </>
      {pathname && pathname !== "/" && (
        <>
          <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="teal" />}
          >
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
        </>
      )}
    </Flex>
  );
}
