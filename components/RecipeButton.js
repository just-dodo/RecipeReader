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
	FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const { height, width } = Dimensions.get("window");

export default function RecipeButton({ title, items, navigation }) {
	return (
		<View style={styles.Container}>
			<TouchableOpacity
				style={styles.textContainer}
				onPress={() => {
					console.log(title, items);
					navigation.navigate("RecipeDetail", {
						detailTitle: title,
						detailItems: items,
					});
				}}>
				<Text style={styles.titleText}>{title}</Text>
			</TouchableOpacity>
			<View style={{ flexDirection: "row" }}>
				{/* icons */}
				<TouchableOpacity>
					<MaterialCommunityIcons
						name="circle-edit-outline"
						size={29}
						color="black"
					/>
				</TouchableOpacity>
				<TouchableOpacity>
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
