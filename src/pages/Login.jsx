import React, { useEffect, useState } from "react";
import {
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  Center,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  ArrowRightIcon,
  ArrowForwardIcon,
  PhoneIcon,
  EmailIcon,
  LockIcon,
} from "@chakra-ui/icons";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.current) {
      navigate("/home");
    }
  }, [user]);

  const [registering, setRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleButtonAction = async () => {
    setLoading(true);
    if (registering) {
      await user.register(email, password, name, phone).then(() => {
        setLoading(false);
      });
    } else {
      user.login(email, password).then(() => {
        setLoading(false);
      });
    }
  };

  return (
    <Center height="100vh">
      <Stack width={400} padding={16} border="1px solid #ccc" borderRadius="lg">
        <Heading size="md" mb={4} alignSelf="center">
          {registering ? "Create Account" : "Please Login"}
        </Heading>
        {registering && (
          <Input
            placeholder="Name"
            size="md"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        )}
        {registering && (
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
        )}
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
        <Stack justifyContent="space-evenly">
          <Button
            rightIcon={registering ? <ArrowRightIcon /> : <ArrowForwardIcon />}
            colorScheme="teal"
            variant="solid"
            isLoading={loading}
            onClick={handleButtonAction}
          >
            {registering ? `Register` : `Login`}
          </Button>
          <Button
            colorScheme="teal"
            variant="link"
            size="xs"
            mt={2}
            onClick={() => setRegistering(!registering)}
          >
            {!registering ? `Register` : `Login`}
          </Button>
        </Stack>
      </Stack>
    </Center>
  );
}
