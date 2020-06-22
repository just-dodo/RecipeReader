import * as React from "react";
import { StyleSheet, Text, View, Clipboard, Alert } from "react-native";

import * as FacebookAds from "expo-ads-facebook";
const { AdTriggerView, AdMediaView, AdIconView } = FacebookAds;

const placementId = "657820491463765_657821421463672";
const numberOfAdsToRequest = 1;
const adsManager = new FacebookAds.NativeAdsManager(
	placementId,
	numberOfAdsToRequest
);

class AdComponent extends React.Component {
	render() {
		return (
			<View style={styles.Container}>
				<AdMediaView style={{ alignSelf: "center", width: 450, height: 450 }} />
				<View style={{ flexDirection: "row" }}>
					<AdIconView style={{ width: 50, height: 50 }} />
					<AdTriggerView>
						<Text>{this.props.nativeAd.bodyText}</Text>
					</AdTriggerView>
				</View>
			</View>
		);
	}
}

export default FacebookAds.withNativeAd(AdComponent);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fafafa",
	},
});
