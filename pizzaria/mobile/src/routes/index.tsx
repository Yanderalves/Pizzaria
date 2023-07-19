import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";

import colors from "../colors";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

import { AuthContext } from "../contexts/AuthContext";

export default function Routes() {
  const { isAuthenticated } = useContext(AuthContext);
  const loading = false;

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: colors["dark-900"],
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color={colors.white} size={45} />
      </View>
    );
  }

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}
