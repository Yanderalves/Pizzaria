import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React, { ReactNode, createContext, useEffect, useState, useMemo } from "react";
import api from "../services/api";


type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
 readonly children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    email: "",
    id: "",
    name: "",
    token: "",
  });

  const isAuthenticated = useMemo(()=> !!user.token, [user]);

  useEffect(() => {
    async function getUser() {
      const userInfo = await AsyncStorageLib.getItem("@pizzaria");
      const hasUser: UserProps = JSON.parse(userInfo || "{}");

      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common.Authorization = `Bearer ${hasUser.token}`;

        setUser({
          id: hasUser.id,
          email: hasUser.email,
          name: hasUser.name,
          token: hasUser.token,
        });
      }
    }
    getUser();
  }, []);

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const { id, name, token } = response.data;

      const data = {
        ...response.data,
      };

      await AsyncStorageLib.setItem("@pizzaria", JSON.stringify(data));

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      setUser({
        id,
        name,
        email,
        token,
      });
    } catch (error) {
      console.log("F", error);
    }
  }

  async function signOut() {
    await AsyncStorageLib.clear().then(() => {
      setUser({
        email: "",
        id: "",
        name: "",
        token: "",
      });
    });
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
