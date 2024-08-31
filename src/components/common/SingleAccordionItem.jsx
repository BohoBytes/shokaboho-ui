import React from "react";
import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  List,
  ListItem,
  ListIcon,
  Link,
} from "@chakra-ui/react";

export default function SingleAccordionItem({ title, data }) {
  return (
    <AccordionItem backgroundColor="white" mb={2} borderRadius={10}>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left" fontSize="md" fontWeight={500}>
          {title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={5}>
        <List spacing={2}>
          {data.map(({ value, icon, color, link }, key) => (
            <ListItem key={key} fontSize="sm">
              {icon && <ListIcon as={icon} color={color} />}
              {link ? (
                <Link href={link} color="teal.500" textDecoration="underline">
                  {value}
                </Link>
              ) : (
                value
              )}
            </ListItem>
          ))}
        </List>
      </AccordionPanel>
    </AccordionItem>
  );
}
