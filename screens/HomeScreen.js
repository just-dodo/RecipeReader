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

const { height, width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const [newTitle, setNewTitle] = useState("");
  const [recipes, setRecipes] = useState([
    // {
    //   id: "1",
    //   title: "순두부찌개 레시피",
    //   items: [
    //     "냄비에 기름을 두르고 파를 볶는다",
    //     "파가 노릇노릇해지면 돼지고기를 볶는다.",
    //     "돼지고기가 어느정도 익으면 다진 마늘과 다진 양파를 넣고 볶는다.",
    //     "수분이 날라가면 고추가루를 넣고 볶는다.",
    //     "간장을 냄비 바닥에 부어 졸인다.",
    //     "물을 넣고 끓인 후, 각종 야채를 넣는다.",
    //     "국간장이나 소금으로 간을 하고, 순두부를 넣는다.",
    //   ],
    // },
    // {
    //   id: "2",
    //   title: "갈릭 크림파스타",
    //   items: [
    //     "물을 올린다. 끓으면 면을 넣고 시간을 쟨다.",
    //     "버터에 마늘을 볶는다.",
    //     "색이 나면 양파도 볶는다.",
    //     "미리 소금간을 해준다.",
    //     "베이컨 등을 넣고 볶아준 후, 크림을 넣고 한보끔 끓인다.",
    //     "치즈를 한장 넣어준다. (선택사항)",
    //     "면이 익으면 면을 넣고 잘 섞어준다.",
    //     "소금, 후추, 파마산 치즈 등으로 간을 맞춘다.",
    //   ],
    // },
    // {
    //   id: "3",
    //   title: "된장찌개",
    //   items: [
    //     "재료 : 멸치, 각종 야채, 두부, 간마늘, 된장",
    //     "멸치를 약 10개 다듬는다. 머리를 제거하고 똥과 가시를 제거한다.",
    //     "멸치를 2개 혹은 3개로 찢어 물에끓인다.",
    //     "야채와 두부 등을 썰어 둔다. 가능하면 깍둑썰기한다.",
    //     "양파로 맛을 낸다면 잘게 썰어 일찍 넣는다.",
    //     "버섯 - 호박 - 된장 순으로 넣는다. 된장이 잘 안 부서져 있다면 체로 풀어 넣는다.",
    //     "찌개가 끓으면 파와 고추를 넣는다.",
    //     "다시 끓으면 두부를 넣고 다시 끓이면 완성.",
    //   ],
    // },
  ]);
  // const reversedRecipes = recipes;
  // reversedRecipes.reverse();
  // console.log(reversedRecipes);
  // Audio.requestPermissionsAsync();
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
            <RecipeButton
              title={item.title}
              items={item.items}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
  //ADD Recipe Function
  function AddRecipe() {
    if (newTitle != "") {
      const ID = Date.now();
      setRecipes(
        recipes
          .reverse()
          .concat({
            id: ID,
            title: newTitle,
            items: [],
            createdTime: Date.now(),
          })
          .reverse()
      );
      setNewTitle("");
    }
    console.log(recipes);
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
