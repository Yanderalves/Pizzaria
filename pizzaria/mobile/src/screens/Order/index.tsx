import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { useRoute, RouteProp } from "@react-navigation/native";

type RouterDetailsParams = {
  Order: {
    order_id: string;
    number: number | string;
  };
};

type OrderRouteProps = RouteProp<RouterDetailsParams, "Order">;

export default function Order() {
  const route = useRoute<OrderRouteProps>();
  return (
    <View>
      <Text>{route.params.order_id}</Text>
    </View>
  );
}
