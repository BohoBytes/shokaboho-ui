import React from "react";
import { Box } from "@chakra-ui/react";
import { getImage } from "../lib/cloudinary";
import { AdvancedImage } from "@cloudinary/react";

export default function Logo({ height, width, radius }) {
  return (
    <Box>
      <AdvancedImage
        cldImg={getImage("shokaboho_logo1", {
          height,
          width,
          radius,
        })}
      />
    </Box>
  );
}
