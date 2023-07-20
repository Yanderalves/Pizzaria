import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../colors";
import { CategoryProps, ProductProps } from "../../screens/Order";

type ModalPickerProps = {
  options: CategoryProps[] | ProductProps[];
  handleCloseModal: () => void;
  selectedItem: (item: ProductProps | CategoryProps) => void;
};

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export default function ModalPicker({
  handleCloseModal,
  options,
  selectedItem,
}: ModalPickerProps) {
  const option = options.map((item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.option}
      onPress={() => onPressItem(item)}
    >
      <Text style={styles.textOption}>{item.name}</Text>
    </TouchableOpacity>
  ));

  function onPressItem(item: CategoryProps) {
    selectedItem(item);
    handleCloseModal();
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
      <View style={styles.content}>
        <ScrollView>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    height: HEIGHT / 2,
    width: WIDTH - 20,
    backgroundColor: colors.white,
  },
  option: {
    borderBottomWidth: 1,
    borderColor: colors["gray-100"],
    height: 50,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
  },
  textOption: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
