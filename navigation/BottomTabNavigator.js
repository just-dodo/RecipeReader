import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import { HomeScreen, HomeStackScreen } from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
	// Set the header title on the parent stack navigator depending on the
	// currently active tab. Learn more in the documentation:
	// https://reactnavigation.org/docs/en/screen-options-resolution.html
	navigation.setOptions({ headerTitle: getHeaderTitle(route) });

	return (
		<BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
			<BottomTab.Screen
				name="HomeStackScreen"
				component={HomeStackScreen}
				options={{
					title: "나의 레시피",
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} name="book" />
					),
				}}
			/>
			<BottomTab.Screen
				name="FindRecipe"
				component={LinksScreen}
				options={{
					title: "레시피 찾기",
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} name="magnify" />
					),
				}}
			/>
		</BottomTab.Navigator>
	);
}

function getHeaderTitle(route) {
	const routeName =
		route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

	switch (routeName) {
		case "Recipe":
			return "레시피 리더";
		case "FindRecipe":
			return "레시피 찾기";
	}
}
