import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { StyleSheet, Text, View, Clipboard, Alert } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import AdComponent from "../components/FacebookAdModule";

import * as FacebookAds from "expo-ads-facebook";

const placementId = "657820491463765_657821421463672";
const numberOfAdsToRequest = 1;
const adsManager = new FacebookAds.NativeAdsManager(
	placementId,
	numberOfAdsToRequest
);

export default function LinksScreen() {
	// FacebookAds.InterstitialAdManager.showAd(placementId)
	// 	.then((didClick) => {})
	// 	.catch((error) => {});
	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}>
			<View style={styles.updateContainer}>
				<Text style={{ fontSize: 15 }}> 반응을 보고 업데이트 예정입니다! </Text>
			</View>
			<OptionButton
				icon="star"
				label="별점으로 응원하기"
				onPress={() => WebBrowser.openBrowserAsync("https://docs.expo.io")}
			/>

			<OptionButton
				icon="comment-question-outline"
				label="문의/버그 신고 : dodo4114@naver.com"
				onPress={() => {
					Clipboard.setString("dodo4114@naver.com");
					Alert.alert("이메일 주소가 복사되었습니다.");
				}}
			/>

			<OptionButton
				icon="coin"
				// label="후원 : 3333038993 413 카카오뱅크 (박도현)"
				onPress={() => {
					Clipboard.setString("3333038993413 카카오뱅크");
					Alert.alert("계좌번호가 복사되었습 니다.");
				}}
				isLastOption
			/>
			<View>
				<AdComponent adsManager={adsManager} />
			</View>
		</ScrollView>
	);
}

function OptionButton({ icon, label, onPress, isLastOption }) {
	return (
		<RectButton
			style={[styles.option, isLastOption && styles.lastOption]}
			onPress={onPress}>
			<View style={{ flexDirection: "row" }}>
				<View style={styles.optionIconContainer}>
					<MaterialCommunityIcons
						name={icon}
						size={22}
						color="rgba(0,0,0,0.35)"
					/>
				</View>
				<View style={styles.optionTextContainer}>
					<Text style={styles.optionText}>{label}</Text>
				</View>
			</View>
		</RectButton>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fafafa",
	},
	updateContainer: {
		paddingHorizontal: 15,
		paddingBottom: 15,
	},
	contentContainer: {
		paddingTop: 15,
	},
	optionIconContainer: {
		marginRight: 12,
	},
	option: {
		backgroundColor: "#fdfdfd",
		paddingHorizontal: 15,
		paddingVertical: 15,
		borderWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: 0,
		borderColor: "#ededed",
	},
	lastOption: {
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	optionText: {
		fontSize: 15,
		alignSelf: "flex-start",
		marginTop: 1,
	},
});
