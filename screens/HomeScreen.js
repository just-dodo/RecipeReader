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
import Recipe from "../components/Recipes";
import { Audio } from "expo-av";
import RecipeButton from "../components/RecipeButton";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeDetail from "../screens/RecipeDetail";

const { height, width } = Dimensions.get("window");
const DATA = [
	{
		title: "순두부찌개 레시피",
		items: [
			"냄비에 기름을 두르고 파를 볶는다",
			"파가 노릇노릇해지면 돼지고기를 볶는다.",
			"돼지고기가 어느정도 익으면 다진 마늘과 다진 양파를 넣고 볶는다.",
			"수분이 날라가면 고추가루를 넣고 볶는다.",
			"간장을 냄비 바닥에 부어 졸인다.",
			"물을 넣고 끓인 후, 각종 야채를 넣는다.",
			"국간장이나 소금으로 간을 하고, 순두부를 넣는다.",
		],
	},
	{
		title: "갈릭 크림파스타",
		items: [
			"물을 올린다. 끓으면 면을 넣고 시간을 쟨다.",
			"버터에 마늘을 볶는다.",
			"색이 나면 양파도 볶는다.",
			"미리 소금간을 해준다.",
			"베이컨 등을 넣고 볶아준 후, 크림을 넣고 한보끔 끓인다.",
			"치즈를 한장 넣어준다. (선택사항)",
			"면이 익으면 면을 넣고 잘 섞어준다.",
			"소금, 후추, 파마산 치즈 등으로 간을 맞춘다.",
		],
	},
];

export default function HomeScreen({ navigation }) {
	const [newHead, setNewHead] = useState("");
	Audio.requestPermissionsAsync();
	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />

			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}>
				<View style={styles.newContainer}>
					<TextInput
						style={styles.newHead}
						placeholder={"+ New Recipe"}
						value={newHead}
						onChangeText={(text) => setNewHead(text)}
						placeholderTextColor={"#229C6E"}
						returnKeyType={"next"}
					/>
				</View>
				<FlatList
					data={DATA}
					renderItem={({ item }) => (
						<RecipeButton
							title={item.title}
							items={item.items}
							navigation={navigation}
						/>
					)}
					//keyExtractor={item => item.id}
				/>
			</ScrollView>
		</View>
	);
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
		height: 0.7 * height,
		borderRadius: 5,
		//alignItems: "center",
		backgroundColor: "white",
		//justifyContent: "center",
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
	newHead: {
		fontSize: 20,
		paddingVertical: 20,
		marginHorizontal: 20,
		borderBottomColor: "#bbb",
		borderBottomWidth: 1,
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
