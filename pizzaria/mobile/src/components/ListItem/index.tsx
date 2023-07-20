import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../colors";

type ItemProps = {
  data: {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
  };
  deleteItem: (item_id: string) => void;
};

export default function ListItem({ data, deleteItem }: ItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.textItem}>
        {data.amount} - {data.name}
      </Text>
      <TouchableOpacity onPress={() => deleteItem(data.id)}>
        <Feather name="trash-2" size={30} color={colors["red-900"]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors["dark-900"],
    padding: 15,
    borderRadius: 5,
    borderColor: colors["gray-100"],
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  textItem: {
    color: colors.white,
    fontSize: 15,
  },
});
