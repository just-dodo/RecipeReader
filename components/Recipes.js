import React from "react";
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

import * as Speech from "expo-speech";

export default function Recipe({ title, items }) {
	console.log(items);
	return (
		<View style={styles.Container}>
			<TouchableOpacity
				onPress={() => {
					for (let item of items) {
						Speech.speak(item);
					}
				}}>
				<Text style={styles.titleText}>{title}</Text>
				<FlatList
					data={items}
					renderItem={({ item }) => (
						<Text style={styles.textText}> {item} </Text>
					)}
					//keyExtractor={item => item.id}
				/>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	Container: {
		padding: 20,
	},
	titleText: {
		fontSize: 20,
	},
	textText: {
		fontSize: 15,
	},
});
