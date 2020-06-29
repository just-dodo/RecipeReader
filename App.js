import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

import useCachedResources from "./hooks/useCachedResources";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import { AppLoadign } from "expo";
import * as FacebookAds from "expo-ads-facebook";

const Stack = createStackNavigator();

export default function App(props) {
	const [isLoaded, setIsLoaded] = useState(0);
	const isLoadingComplete = useCachedResources();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<View style={styles.container}>
				{Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
				<NavigationContainer linking={LinkingConfiguration}>
					<Stack.Navigator>
						<Stack.Screen name="레시피 리더" component={BottomTabNavigator} />
					</Stack.Navigator>
				</NavigationContainer>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
