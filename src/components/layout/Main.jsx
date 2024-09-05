import { Center, Flex } from "@chakra-ui/react";
import Header from "./Header";
import Logo from "./Logo";
import { Grid, GridItem } from "@chakra-ui/react";
import Footer from "./Footer";
import {
  BODY_BG_COLOR,
  FOOTER_BG_COLOR,
  HEADER_BG_COLOR,
} from "../../lib/constants";

export default function Main({ children }) {
  return (
    <Grid
      templateAreas={`"header"
                  "main"
                  "footer"`}
      gridTemplateRows={"50px 1fr 70px"}
      gridTemplateColumns={"1fr"}
      h="100vh"
      color="blackAlpha.700"
    >
      <GridItem pl="1" area={"header"} bg={HEADER_BG_COLOR}>
        <Header />
      </GridItem>
      <GridItem pl="1" area={"main"} bg={BODY_BG_COLOR}>
        <Center flexDirection="column" height="100%">
          <Logo height={100} width={100} radius={100} to={"/"} />
          <Flex justifyContent="center" width="100%">
            {children}
          </Flex>
        </Center>
      </GridItem>
      <GridItem pl="1" area={"footer"} bg={FOOTER_BG_COLOR}>
        <Footer />
      </GridItem>
    </Grid>
  );
}
