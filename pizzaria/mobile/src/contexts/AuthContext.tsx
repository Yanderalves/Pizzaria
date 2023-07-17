import { View, Text } from "react-native";
import React, { ReactNode, createContext, useState } from "react";

type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    email: "teste@teste",
    id: "teste",
    name: "'teste",
    token: "teste",
  });

  const isAuthenticated = !!user.token;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
