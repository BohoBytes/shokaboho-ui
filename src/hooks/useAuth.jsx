import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../lib/appwrite";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider(props) {
  const toast = useToast();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  async function login(email, password) {
    try {
      const loggedIn = await account.createEmailPasswordSession(
        email,
        password
      );
      setUser(loggedIn);
      navigate("/home");
    } catch (error) {
      toast({
        title: "Error occured",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
    window.location.replace("/login");
  }

  async function register(email, password) {
    try {
      await account.create(ID.unique(), email, password);
      await login(email, password);
    } catch (error) {
      toast({
        title: "Error occured",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (error) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ current: user, login, logout, register }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
