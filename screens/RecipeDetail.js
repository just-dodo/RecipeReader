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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Recipe from "../components/Recipes";
import { Audio } from "expo-av";

import * as Speech from "expo-speech";

const { height, width } = Dimensions.get("window");

export default function RecipeDetail({ navigation, route }) {
	const detailTitle = route.params.detailTitle;
	const detailItems = route.params.detailItems;
	console.log(route);

	const [spokenItem, setSpokenItem] = useState(0);
	return (
		<View style={styles.Container}>
			<View style={styles.TitleContainer}>
				<Text style={styles.TitleText}>{detailTitle}</Text>
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

			<TouchableOpacity
				style={{ flex: 1 }}
				onPress={() => {
					// 첫 누름 -> 첫 아이템 읽기, 일시정지. 다음 누름 -> 일시 정지한 부분부터 시작

					if (spokenItem < detailItems.length) {
						Speech.speak(detailItems[spokenItem], { rate: 0.9 });
						setSpokenItem(spokenItem + 1);
					} else {
						setSpokenItem(0);
						Speech.speak("요리 끝.");
					}
				}}>
				<ScrollView style={styles.ItemsContainer}>
					<FlatList
						data={detailItems}
						renderItem={({ item, index }) => (
							<View style={styles.itemContainer}>
								<Text style={styles.itemText}>{index + 1}. </Text>
								<Text style={styles.itemText}>{item}</Text>
							</View>
						)}
						//keyExtractor={item => item.id}
					/>
				</ScrollView>
			</TouchableOpacity>
		</View>
	);
}
const styles = StyleSheet.create({
	Container: {
		flex: 1,
		paddingHorizontal: 25,
		backgroundColor: "white",
	},
	TitleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 20,
		width: 0.9 * width,
		height: 0.1 * height,
		borderRadius: 5,
		alignItems: "center",
		backgroundColor: "#229C6E",
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
	TitleText: {
		fontSize: 20,
		color: "white",
	},
	ItemsContainer: {},

	itemContainer: {
		flexDirection: "row",
		margin: 3,
	},
	itemText: {
		fontSize: 18,
	},
});
