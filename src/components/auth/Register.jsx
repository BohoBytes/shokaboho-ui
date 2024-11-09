import React, { useState, useEffect } from "react";
import {
  Input,
  VStack,
  InputGroup,
  InputLeftElement,
  Button,
  InputRightElement,
  Checkbox,
  Text,
  Box,
} from "@chakra-ui/react";
import { PhoneIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.current) {
      navigate("/home");
    }
  }, [user]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const [accept, setAccept] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    user.register(email, password, name, phone).then(() => {
      setLoading(false);
    });
  };

  return (
    <VStack>
      <Input
        placeholder="Name"
        size="md"
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <PhoneIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="tel"
          placeholder="Phone"
          size="md"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
      </InputGroup>
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
      <Box backgroundColor="gray.50" borderRadius={5} my={2} px={2}>
        <Checkbox
          value={accept}
          size="md"
          p={2}
          onChange={(e) => setAccept(e.target.checked)}
        >
          <Text fontSize="xs" color="gray.500">
            By registering, you agree to our terms and conditions
          </Text>
        </Checkbox>
      </Box>
      <Button
        colorScheme="teal"
        variant="solid"
        isLoading={loading}
        onClick={handleRegister}
        width={"100%"}
        isDisabled={!email || !password || !accept}
      >
        Register
      </Button>
    </VStack>
  );
}
