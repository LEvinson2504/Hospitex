import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { View } from "../UI/Themed";
import { Button } from "react-native-paper";

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
    <View>
      {displays[currentDisplay]}
      <View>
        <Button
          onPress={() => {
            setCurrentDisplay(currentDisplay === 0 ? 1 : 0);
          }}
        >
          {currentDisplay === 0
            ? "Don't have an account? Register here"
            : "Already have an account? Login"}
        </Button>
      </View>
    </View>
  );
};

export default Auth;
