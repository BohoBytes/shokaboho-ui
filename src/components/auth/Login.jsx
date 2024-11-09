import React, { useEffect, useState } from "react";
import {
  Input,
  VStack,
  InputGroup,
  InputLeftElement,
  Button,
  InputRightElement,
} from "@chakra-ui/react";
import { ArrowRightIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.current) {
      navigate("/home");
    }
  }, [user]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    user.login(email, password).then(() => {
      setLoading(false);
    });
  };
  return (
    <VStack>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <EmailIcon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Email *"
          size="md"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </InputGroup>
      <InputGroup size="md">
        <InputLeftElement pointerEvents="none">
          <LockIcon color="gray.300" />
        </InputLeftElement>
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Password *"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button
        rightIcon={<ArrowRightIcon />}
        colorScheme="teal"
        variant="solid"
        isLoading={loading}
        onClick={handleLogin}
        width={"100%"}
      >
        Login
      </Button>
      <Button
        colorScheme="teal"
        variant="link"
        size="xs"
        mt={2}
        onClick={() => navigate("/forgot-password")}
      >
        Forgot Password?
      </Button>
    </VStack>
  );
}
