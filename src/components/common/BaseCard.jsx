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
}) {
  return (
    <Card
      width={w}
      borderRadius={20}
      bg={bg}
      color={color}
      boxShadow={shadow ? shadow : undefined}
      style={st}
    >
      <CardBody>
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
