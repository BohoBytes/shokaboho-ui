import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account, OAuthProvider } from "../lib/appwrite";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider(props) {
  const toast = useToast();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  async function login(email, password) {
    try {
      await account.createEmailPasswordSession(email, password).then((res) => {
        account.get(res.userId).then((res) => {
          setUser(res);
          localStorage.setItem("user", JSON.stringify(res));
          navigate("/");
        });
      });
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

  async function authLogin(social) {
    const provider = {
      google: OAuthProvider.Google,
      facebook: OAuthProvider.Facebook,
    }[social];

    account.createOAuth2Session(
      provider,
      import.meta.env.VITE_OAUTH_SUCCESS_URL,
      import.meta.env.VITE_OAUTH_FAILURE_URL
    );
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
    localStorage.removeItem("user");
    window.location.replace("/login");
  }

  async function register(email, password, name, phone) {
    try {
      await account.create(ID.unique(), email, password, name, [{ phone }]);
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
    <AuthContext.Provider
      value={{
        current: user,
        login,
        authLogin,
        logout,
        register,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
