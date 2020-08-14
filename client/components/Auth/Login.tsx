import React, { useContext } from "react";

import { View, Text } from "../Themed";
import { Formik } from "formik";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import { AsyncStorage } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { baseURL } from "../../baseURL";

type Props = {
  setIsLoggedIn: (bool: boolean) => void;
};

const Login: React.FC<Props> = ({ setIsLoggedIn }) => {
  const { setUser } = useContext(UserContext);

  return (
    <View>
      <Text>Login</Text>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        <Formik
          onSubmit={async (values) => {
            try {
              const response = await axios({
                method: "POST",
                url: `${baseURL}/auth/login`,
                data: values,
              });
              if (response.data && response.data.user) {
                // set context provider api here for session
                console.log("Successfully logged in");
                const user = response.data.user;
                setUser({
                  id: user._id,
                  username: user.username,
                  role: user.role,
                });
                setIsLoggedIn(true);
              }
            } catch (err) {
              console.log(err.message);
              console.log("Auth failed");
              setIsLoggedIn(false);
            }
          }}
          initialValues={{
            username: "",
            password: "",
          }}
        >
          {({ values, handleSubmit, handleChange }) => (
            <View>
              <TextInput
                label="Username"
                value={values.username}
                onChangeText={handleChange("username")}
              />
              <TextInput
                label="Password"
                value={values.password}
                onChangeText={handleChange("password")}
              />
              <Button onPress={handleSubmit}>Login</Button>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Login;
