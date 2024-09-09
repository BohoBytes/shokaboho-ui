import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    toast({
      description: "Sorry, the page you are looking for could not be found.",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
    navigate("/");
  });
  return null;
}
