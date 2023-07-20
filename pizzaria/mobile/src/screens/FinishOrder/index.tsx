import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../colors";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamsList } from "../../routes/app.routes";
import api from "../../services/api";

type RouteDetailsParams = {
  FinishOrder: {
    order_id: string;
    number: string | number;
  };
};

type OrderRouteParams = RouteProp<RouteDetailsParams, "FinishOrder">;

export default function FinishOrder() {
  const route = useRoute<OrderRouteParams>();
  const navigation = useNavigation<StackNavigationProp<StackParamsList>>();

  async function handleFinishOrder() {
    try {
      await api.patch("/order/finish", {
        order_id: route.params.order_id,
      });
      navigation.popToTop();
    } catch (error) {
      console.log("Error");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.text}>Você deseja finalizar o pedido?</Text>
        <Text style={styles.text}>Mesa: {route.params.number}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleFinishOrder}>
        <Text style={styles.buttonText}>Finalizar pedido</Text>
        <Feather name="shopping-cart" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["dark-700"],
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },
  containerText: {
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  text: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    padding: 5,
    gap: 5,
    backgroundColor: colors["green-900"],
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
