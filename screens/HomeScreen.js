import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
  SectionList,
  FlatList,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Audio } from "expo-av";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import "react-native-get-random-values";
//import { v1 as uuidv1 } from "uuid";

import Proptypes from "prop-types";

import Recipe from "../components/Recipes";
import RecipeDetail from "../screens/RecipeDetail";
import RecipeButton from "../components/RecipeButton";
import { set, color } from "react-native-reanimated";

import { defaultRecipes } from "../assets/defaultRecipes.js";

import {
  storeData,
  getData,
  putData,
  removeData,
} from "../assets/asyncStorageFunctions.js";

const { height, width } = Dimensions.get("window");

for (var recipe of defaultRecipes) {
  storeData(recipe.id, recipe);
}
export default function HomeScreen({ navigation }) {
  const [newTitle, setNewTitle] = useState("");
  const [recipes, setRecipes] = useState(defaultRecipes);
  console.log(recipes);  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.contentContainer}>
        <FlatList
          // Header = New Recipe Input
          ListHeaderComponentStyle={styles.newContainer}
          ListHeaderComponent={
            <TextInput
              style={styles.newTitle}
              placeholder={"+ New Recipe"}
              value={newTitle}
              onChangeText={(text) => setNewTitle(text)}
              placeholderTextColor={"#229C6E"}
              returnKeyType={"next"}
              onSubmitEditing={() => {
                AddRecipe();
              }}
            />
          }
          // How Container works
          scrollEnabled={true}
          // If There is no Recipe
          ListEmptyComponent={
            <Text
              style={{
                fontSize: 22,
                color: "white",
                alignSelf: "center",
              }}>
              아직 레시피가 없습니다
            </Text>
          }
          // Recipes List
          data={recipes}
          renderItem={({ item }) => (
            <RecipeButton recipe={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
  //ADD New Recipe Function
  //Recipe : ID / title / items / createdTime
  function AddRecipe() {
    if (newTitle != "") {
      const ID = `${Date.now()}`
      const NewRecipe = {
        id: ID,
        title: newTitle,
        items: [],
        createdTime: Date.now(),
      };
      setRecipes(recipes.reverse().concat(NewRecipe).reverse());
      storeData(NewRecipe.id, NewRecipe);
      setNewTitle("");
    }
  }
}

HomeScreen.navigationOptions = {
  header: "home",
};

const HomeStack = createStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="RecipeDetail" component={RecipeDetail} />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#229C6E",
  },
  contentContainer: {
    paddingTop: 30,
    alignContent: "center",
    alignItems: "center",
    flex: 1,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center",
  },
  navigationFilename: {
    marginTop: 5,
  },
  newContainer: {
    marginVertical: 20,
    width: 0.9 * width,
    height: 0.1 * height,
    borderRadius: 5,
    //alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    //padding: 20,
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
  newTitle: {
    fontSize: 20,
    paddingVertical: 20,
    marginHorizontal: 20,
    // borderBottomColor: "#bbb",
    // borderBottomWidth: 1,
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});

{
  /* <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
  <Text style={styles.helpLinkText}>
    Help, it didn’t automatically reload!
  </Text>
</TouchableOpacity> */
}
