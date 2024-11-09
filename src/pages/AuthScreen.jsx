import React, { useEffect, useState } from "react";
import { Stack, Center, Box, Flex, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useAuth } from "../components/auth/useAuth";
import { useNavigate } from "react-router-dom";
import Logo from "../components/common/Logo";
import { Image } from "@chakra-ui/react";
import logoGoogle from "../assets/icons/logo-google.png";
import logoFacebook from "../assets/icons/logo-facebook.png";
import logoApple from "../assets/icons/logo-apple.png";
import iconEmail from "../assets/icons/logo-email.png";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const AuthButton = ({ variant, cb }) => {
  const { src, alt } = {
    google: {
      src: logoGoogle,
      alt: "GoogleIcon",
    },
    facebook: {
      src: logoFacebook,
      alt: "FacebookIcon",
    },
    apple: {
      src: logoApple,
      alt: "AppleIcon",
    },
    email: {
      src: iconEmail,
      alt: "EmailIcon",
    },
  }[variant];
  return (
    <Image
      src={src}
      alt={alt}
      boxSize="35px"
      objectFit={"cover"}
      onClick={cb}
      style={{ cursor: "pointer" }}
    />
  );
};

export default function AuthScreen() {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.current) {
      navigate("/home");
    }
  }, [user]);

  const [registering, setRegistering] = useState(true);

  return (
    <Center height="100vh" bg="#d5d5d3">
      <Stack
        width={450}
        border="1px solid #ccc"
        borderRadius="lg"
        bg="#FFF"
        p={10}
        spacing={5}
      >
        {!registering && (
          <IconButton
            variant="link"
            colorScheme="teal"
            aria-label="Back to registration"
            icon={<CloseIcon />}
            onClick={() => setRegistering(true)}
            marginLeft="auto"
          />
        )}
        <Box m="auto" mb={4}>
          <Logo height={60} width={60} radius={100} to="/" />
        </Box>

        {registering ? (
          <>
            <Flex
              justifyContent="space-evenly"
              bg="gray.50"
              paddingY={5}
              borderRadius="lg"
            >
              <AuthButton variant="google" cb={() => authLogin("google")} />
              <AuthButton variant="facebook" cb={() => authLogin("facebook")} />
              <AuthButton variant="apple" cb={() => {}} />
              <AuthButton
                variant="email"
                cb={() => setRegistering(!registering)}
              />
            </Flex>
            <Box fontSize="lg" fontWeight={700} textAlign="center" m={4}>
              --- or ---
            </Box>
            <Register />
          </>
        ) : (
          <Login />
        )}
      </Stack>
    </Center>
  );
}
