import { StatusBar } from "react-native";

import Routes from "./src/routes";

import { NavigationContainer } from "@react-navigation/native";

import colors from "./src/colors";
import { AuthProvider } from "./src/contexts/AuthContext";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar
          backgroundColor={colors["dark-700"]}
          barStyle={"light-content"}
          translucent={false}
        />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
