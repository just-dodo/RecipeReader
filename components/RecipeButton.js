import React, { useState, useRef } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TextInput } from "react-native-gesture-handler";

import {
  storeData,
  getData,
  putData,
  removeData,
} from "../assets/asyncStorageFunctions.js";

const { height, width } = Dimensions.get("window");
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
export default function RecipeButton({ recipe, navigation }) {
  //Recipe : ID / title / items / createdTime
  const title = recipe.title;
  const items = recipe.items;
  // Hooks
  const [editing, setEditing] = useState(false); 
  const inputEl = useRef(null);
  //Functions
  const editStart = (E) => {
    setEditing(true);
    E.current.focus();
  };

  return (
    <View style={styles.Container}>
      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => {
          navigation.navigate("RecipeDetail", {
            recipe: recipe,
          });
        }}>
        <TextInput
          ref={inputEl}
          style={styles.titleText}
          editable={editing}
          onChangeText={(text) => {}}
          onSubmitEditing={() => setEditing(false)}
          onBlur={() => setEditing(false)}>
          {title}
        </TextInput>
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        {/* icons */}
        {/* edit Icon */}
        <TouchableOpacity
          onPress={() => {
            editStart(inputEl);
          }}>
          <MaterialCommunityIcons
            name="circle-edit-outline"
            size={29}
            color="black"
          />
        </TouchableOpacity>
        {/* delete Icon */}
        <TouchableOpacity
          onPress={() => {
            console.log(recipe);
            removeData(recipe.id); 
          }}>
          <MaterialCommunityIcons
            name="delete-circle-outline"
            size={30}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    width: 0.9 * width,
    height: 0.1 * height,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  itemContainer: {
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 20,
  },

  textText: {
    fontSize: 15,
  },
});
