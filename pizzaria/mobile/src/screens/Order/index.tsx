import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

import { useRoute, RouteProp } from "@react-navigation/native";
import colors from "../../colors";

type RouterDetailsParams = {
  Order: {
    order_id: string;
    number: number | string;
  };
};

type OrderRouteProps = RouteProp<RouterDetailsParams, "Order">;

export default function Order() {
  const [amount, setAmount] = useState("1");

  const route = useRoute<OrderRouteProps>();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textTable}>Mesa {route.params.number}</Text>
        <TouchableOpacity>
          <Feather name="trash-2" size={30} color={colors["red-900"]} />
        </TouchableOpacity>
      </View>

      <View style={styles.containerInput}>
        <TextInput style={styles.input} value="Pizzas"></TextInput>
        <TextInput style={styles.input} value="Pizza de frango"></TextInput>
      </View>

      <View style={styles.containerQtd}>
        <Text style={styles.textQtd}>Quantidade</Text>
        <TextInput
          style={[
            styles.input,
            { width: "70%", height: 45, textAlign: "center" },
          ]}
          value={amount}
          keyboardType="numeric"
        ></TextInput>
      </View>

      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.buttonAdd}>
          <Feather
            style={styles.buttonAdd}
            name="plus"
            size={22}
            color={colors.white}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonAdvanced}>
          <Text style={styles.textButton}>Avançar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["dark-700"],
    justifyContent: "center",
    gap: 25,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  textTable: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "bold",
  },
  containerInput: {
    gap: 15,
  },
  input: {
    backgroundColor: colors["dark-900"],
    height: 60,
    color: colors.white,
    padding: 10,
    borderRadius: 5,
  },
  containerQtd: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  textQtd: {
    fontSize: 15,
    color: colors.white,
    width: "25%",
    textAlign: "center",
    fontWeight: "bold",
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  buttonAdd: {
    backgroundColor: "#3FD1FF",
    width: "25%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonAdvanced: {
    backgroundColor: colors["green-900"],
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    width: "70%",
  },
  textButton: {
    textAlign: "center",
  },
});
