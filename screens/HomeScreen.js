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

const { height, width } = Dimensions.get("window");
const DATA = [
	{
		title: "순두부찌개 레시피",
		items: [
			"1. 냄비에 기름을 두르고 파를 볶는다",
			"2. 파가 노릇노릇해지면 돼지고기를 볶는다.",
			"3. 돼지고기가 어느정도 익으면 다진 마늘과 다진 양파를 넣고 볶는다.",
			"4. 수분이 날라가면 고추가루를 넣고 볶는다.",
			"5. 간장을 냄비 바닥에 부어 졸인다.",
			"6. 물을 넣고 끓인 후, 각종 야채를 넣는다.",
			"7. 국간장이나 소금으로 간을 하고, 순두부를 넣는다.",
		],
	},
	{
		title: "Sides",
		items: ["French Fries", "Onion Rings", "Fried Shrimps"],
	},
	{
		title: "Drinks",
		items: ["Water", "Coke", "Beer"],
	},
	{
		title: "Desserts",
		items: ["Cheese Cake", "Ice Cream"],
	},
];

export default function HomeScreen() {
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

					<FlatList
						data={DATA}
						renderItem={({ item }) => (
							<Recipe title={item.title} items={item.items} />
						)}
						//keyExtractor={item => item.id}
					/>
				</View>
			</ScrollView>
		</View>
	);
}

HomeScreen.navigationOptions = {
	header: "home",
};

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
