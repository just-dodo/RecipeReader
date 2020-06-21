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
import * as Speech from "expo-speech";
const { height, width } = Dimensions.get("window");

export default function Recipe({ title, items }) {
	const [isEditing, setIsEditing] = useState(false);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [spokenItem, setSpokenItem] = useState(0);

	return (
		<View style={styles.Container}>
			<View style={styles.HeadContainer}>
				<Text style={styles.titleText}>{title}</Text>
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

					if (spokenItem < items.length) {
						Speech.speak(items[spokenItem], { rate: 0.9 });
						setSpokenItem(spokenItem + 1);
					} else {
						setSpokenItem(0);
						Speech.speak("요리 끝.");
					}
				}}>
				<FlatList
					data={items}
					renderItem={({ item, index }) => (
						<View style={styles.itemContainer}>
							<View>
								<Text>{index + 1}. </Text>
							</View>
							<View>
								<Text style={styles.textText}>{item}</Text>
							</View>
						</View>
					)}
					//keyExtractor={item => item.id}
				/>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	Container: {
		marginVertical: 20,
		width: 0.9 * width,
		height: 0.7 * height,
		borderRadius: 5,
		//alignItems: "center",
		backgroundColor: "white",
		//justifyContent: "center",
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
	HeadContainer: {
		marginBottom: 10,
		paddingBottom: 10,
		borderBottomWidth: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	titleText: {
		fontSize: 20,
	},

	textText: {
		fontSize: 15,
	},
});
