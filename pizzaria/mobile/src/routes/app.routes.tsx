import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Dashboard from "../screens/Dashboard";
import Order from "../screens/Order";

export type StackParamsList = {
  Dashboard: undefined;
  Order: {
    number: string | number;
    order_id: string;
  };
};

const Stack = createStackNavigator<StackParamsList>();

export default function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
