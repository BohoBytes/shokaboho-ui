import React from "react";
import { Card, CardBody, Flex, Heading } from "@chakra-ui/react";

export default function BaseCard({
  w = "100%",
  title,
  img,
  bg = "#f5f5f5",
  color = "black",
  shadow,
  note,
  st,
  children,
  onClick,
  stripped = false,
}) {
  return (
    <Card
      width={w}
      borderRadius={!stripped ? 20 : 0}
      bg={bg}
      color={color}
      boxShadow={shadow ? shadow : stripped ? "none" : undefined}
      style={st}
      onClick={onClick}
    >
      <CardBody padding={stripped ? 0 : 5}>
        {img && <img src={img} alt="img" borderRadius="lg" />}
        {title && <Heading size="md">{title}</Heading>}
        {children}
      </CardBody>
      {note && (
        <Flex mr={5} justifyContent="flex-end" fontSize="xs">
          {note}
        </Flex>
      )}
    </Card>
  );
}
