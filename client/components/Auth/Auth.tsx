import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Login from "./Login";
import Register from "./Register";
import { View } from "../UI/Themed";
import { Button, Text } from "react-native-paper";

type Props = {
  setIsLoggedIn: (bool: boolean) => void;
};

const Auth: React.FC<Props> = ({ setIsLoggedIn }) => {
  const [displays, setDisplays] = useState([
    <Login setIsLoggedIn={setIsLoggedIn} />,
    <Register />,
  ]);
  const [currentDisplay, setCurrentDisplay] = useState(0);

  return (
    <View style={styles.container}>
      {displays[currentDisplay]}
      <View>
        <Button
          onPress={() => {
            setCurrentDisplay(currentDisplay === 0 ? 1 : 0);
          }}
        >
          <Text>
            {currentDisplay === 0
              ? "Don't have an account?\nRegister here"
              : "Already have an account? Login"}
          </Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingTop: 100,
    fontSize: 5,
  },
});

export default Auth;
