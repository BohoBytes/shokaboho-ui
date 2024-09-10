import React from "react";
import { Box } from "@chakra-ui/react";
import { getImage } from "../../lib/cloudinary";
import { AdvancedImage } from "@cloudinary/react";
import { useNavigate } from "react-router-dom";

export default function Logo({ height, width, radius, to }) {
  const navigate = useNavigate();
  return (
    <Box p={5}>
      <AdvancedImage
        cldImg={getImage("shokaboho_logo1", {
          height,
          width,
          radius,
        })}
        onClick={to ? () => navigate(to) : null}
        style={{ cursor: to ? "pointer" : "default" }}
      />
    </Box>
  );
}
