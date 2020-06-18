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
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Recipe from "../components/Recipes";

const { height, width } = Dimensions.get("window");

export default function HomeScreen() {
	const [newHead, setNewHead] = useState("");

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
					<Recipe head={"1번째 레시피"} text={"1번째 레시피의 내용"}></Recipe>
					<Recipe head={"2번째 레시피"} text={"2번째 레시피의 내용"}></Recipe>
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
