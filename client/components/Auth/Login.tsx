import React, { useContext } from "react";

import { View, Text } from "../Themed";
import { Formik, FormikProps } from "formik";
import { TextInput, Button, RadioButton } from "react-native-paper";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import { baseURL } from "../../baseURL";
import * as Yup from "yup";
import AsyncStorage from "@react-native-community/async-storage";

type Props = {
  setIsLoggedIn: (bool: boolean) => void;
};

const validationSchema = Yup.object().shape({
  username: Yup.string().label("Username").required(),
  password: Yup.string()
    .label("Password")
    .required()
    .min(4, "Password must have at least 4 characters "),
});

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
              console.log("[Auth] A user is trying to login");
              const response = await axios({
                method: "POST",
                url: `${baseURL}/auth/${
                  values.type === "patient" ? "user" : "hospital"
                }/login`,
                data: values,
              });
              if (response.data && response.data.user) {
                console.log("[Auth] User successfully logged in");
                const user = response.data.user;
                console.log(user._id);
                await AsyncStorage.setItem("cookies", user._id, (err) => {
                  console.log("[Cookies] setStorage failed");
                  console.log(err);
                });

                setUser({
                  id: user._id,
                  username: user.username,
                  role: values.type === "patient" ? "patient" : "hospital",
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
            type: "",
          }}
          validationSchema={validationSchema}
        >
          {({ values, handleSubmit, handleChange, errors }) => (
            <View>
              <TextInput
                label="Username"
                value={values.username}
                onChangeText={handleChange("username")}
              />
              <Text style={{ color: "red" }}>{errors.username}</Text>
              <TextInput
                label="Password"
                value={values.password}
                onChangeText={handleChange("password")}
              />
              <Text style={{ color: "red" }}>{errors.password}</Text>
              <RadioButton.Group
                onValueChange={handleChange("type")}
                value={values.type}
              >
                <View>
                  <Text>Patient</Text>
                  <RadioButton value="patient" />
                </View>
                <View>
                  <Text>Doctor</Text>
                  <RadioButton value="doctor" />
                </View>
                <View>
                  <Text>Hospital</Text>
                  <RadioButton value="hospital" />
                </View>
              </RadioButton.Group>
              <Button onPress={handleSubmit}>Login</Button>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Login;
