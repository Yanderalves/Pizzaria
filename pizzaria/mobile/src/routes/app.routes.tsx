import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import colors from "../colors";
import Dashboard from "../screens/Dashboard";
import FinishOrder from "../screens/FinishOrder";
import Order from "../screens/Order";

export type StackParamsList = {
  Dashboard: undefined;
  Order: {
    number: string | number;
    order_id: string;
  };
  FinishOrder: {
    order_id: string;
    number: string | number;
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
      <Stack.Screen
        name="FinishOrder"
        component={FinishOrder}
        options={{
          title: "Finalizando",
          headerStyle: {
            backgroundColor: colors["dark-700"],
          },
          headerTintColor: colors.white,
        }}
      />
    </Stack.Navigator>
  );
}
