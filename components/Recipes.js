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
} from "react-native";

import * as Speech from "expo-speech";

export default function Recipe({ head, text }) {
	return (
		<View style={styles.Container}>
			<TouchableOpacity onPress={() => Speech.speak(text)}>
				<Text style={styles.headText}>{head}</Text>
				<Text style={styles.textText}>{text}</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	Container: {
		padding: 20,
	},
	headText: {
		fontSize: 20,
	},
	textText: {
		fontSize: 15,
	},
});
