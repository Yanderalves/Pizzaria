import React, { ReactNode, createContext, useState } from "react";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
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
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [user, setUser] = useState<UserProps>({
    email: "",
    id: "",
    name: "",
    token: "",
  });

  const isAuthenticated = !!user.token;

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

    setLoadingAuth(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
