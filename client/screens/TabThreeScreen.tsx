import React from "react";
import { StyleSheet } from "react-native";

import Login from "../components/Auth/Login";
import { View } from "../components/UI/Themed";

export default function TabThreeScreen() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});
