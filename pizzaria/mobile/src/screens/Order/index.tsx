import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import colors from "../../colors";
import ListItem from "../../components/ListItem";
import ModalPicker from "../../components/ModalPicker";
import api from "../../services/api";

type RouterDetailsParams = {
  Order: {
    order_id: string;
    number: number | string;
  };
};

export type CategoryProps = {
  name: string;
  id: string;
};

export type ProductProps = {
  id: string;
  name: string;
};

type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
};

type OrderRouteProps = RouteProp<RouterDetailsParams, "Order">;

export default function Order() {
  const [amount, setAmount] = useState("1");
  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps>();
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
  const [modalProductVisible, setModalProductVisible] = useState(false);
  const [productSelected, setProductSelected] = useState<ProductProps>();
  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [itens, setItens] = useState<ItemProps[] | []>([]);

  useEffect(() => {
    async function loadInfo() {
      const response = await api.get("/category");

      setCategory(response.data);

      setCategorySelected(response.data[0]);
    }

    loadInfo();
  }, []);

  useEffect(() => {
    async function getProductsByCategory() {
      if (categorySelected) {
        const response = await api.get("/category/product", {
          params: {
            category_id: categorySelected?.id,
          },
        });

        setProducts(response.data);
      }
    }
    getProductsByCategory();
  }, [categorySelected]);

  const route = useRoute<OrderRouteProps>();
  const navigate = useNavigation();

  async function handleCloseOrder() {
    await api.delete("/order", {
      params: {
        order_id: route.params?.order_id,
      },
    });
    navigate.goBack();
  }

  function handleChangeCategory(item: CategoryProps) {
    setCategorySelected(item);
  }

  function handleChangeProduct(item: ProductProps) {
    setProductSelected(item);
  }

  async function handleRemoveItem(itemId: string) {
    await api.delete("/order/item", {
      params: {
        item_id: itemId,
      },
    });

    const newArray = itens.filter((item) => {
      return item.id !== itemId;
    });

    setItens(newArray);
  }

  async function handleAddItem() {
    const response = await api.post("/order/item", {
      order_id: route.params.order_id as string,
      product_id: productSelected?.id as string,
      amount: Number(amount),
    });

    const data = {
      id: response.data.id as string,
      product_id: productSelected?.id as string,
      name: productSelected?.name as string,
      amount: Number(amount),
    };

    setItens((oldArray) => [...oldArray, data]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textTable}>Mesa {route.params.number}</Text>

        {itens.length === 0 && (
          <TouchableOpacity onPress={handleCloseOrder}>
            <Feather name="trash-2" size={30} color={colors["red-900"]} />
          </TouchableOpacity>
        )}
      </View>

      {category.length > 0 && (
        <TouchableOpacity
          style={[styles.input, { justifyContent: "center" }]}
          onPress={() => setModalCategoryVisible(true)}
        >
          <Text style={{ color: colors.white }}>{categorySelected?.name}</Text>
        </TouchableOpacity>
      )}

      {products.length > 0 && (
        <TouchableOpacity
          style={[styles.input, { justifyContent: "center" }]}
          onPress={() => setModalProductVisible(true)}
        >
          <Text style={{ color: colors.white }}>{productSelected?.name}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.containerQtd}>
        <Text style={styles.textQtd}>Quantidade</Text>
        <TextInput
          style={[
            styles.input,
            { width: "70%", height: 45, textAlign: "center" },
          ]}
          value={amount}
          keyboardType="numeric"
          onChangeText={setAmount}
        ></TextInput>
      </View>

      <View style={styles.containerButtons}>
        <TouchableOpacity onPress={handleAddItem} style={styles.buttonAdd}>
          <Feather
            style={styles.buttonAdd}
            name="plus"
            size={22}
            color={colors.white}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!(itens.length > 0)}
          style={[
            styles.buttonAdvanced,
            { opacity: !(itens.length > 0) ? 0.6 : 1 },
          ]}
        >
          <Text style={styles.textButton}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType={"fade"}
      >
        <ModalPicker
          handleCloseModal={() => setModalCategoryVisible(false)}
          options={category}
          selectedItem={handleChangeCategory}
        />
      </Modal>

      <Modal
        transparent={true}
        visible={modalProductVisible}
        animationType={"fade"}
      >
        <ModalPicker
          handleCloseModal={() => setModalProductVisible(false)}
          options={products}
          selectedItem={handleChangeProduct}
        />
      </Modal>

      <FlatList
        data={itens}
        renderItem={({ item }) => (
          <ListItem deleteItem={handleRemoveItem} data={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["dark-700"],
    gap: 25,
    paddingTop: "5%",
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
