import React, { useContext } from "react";
import { StyleSheet } from "react-native";

import { View, Text } from "../UI/Themed";
import { Formik, FormikProps } from "formik";
import { TextInput, Button, RadioButton } from "react-native-paper";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import { baseURL } from "../../baseURL";
import * as Yup from "yup";
import AsyncStorage from "@react-native-community/async-storage";
import { isLoggedInContext } from "../../contexts/isLoggedInContext";

type Props = {
  setIsLoggedIn: (bool: boolean) => void;
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required("Please enter a password")
    .min(4, "Password must have at least 4 characters "),
});

const Login: React.FC<Props> = () => {
  const { setIsLoggedIn } = useContext(isLoggedInContext);
  const { setUser } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
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
                await AsyncStorage.setItem("cookies", user._id, (err) => {
                  console.log("[Cookies] setStorage failed");
                  console.log(err);
                });

                setUser({
                  id: user._id,
                  email: user.email,
                  role: values.type,
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
            email: "",
            password: "",
            type: "",
          }}
          validationSchema={validationSchema}
        >
          {({ values, handleSubmit, handleChange, errors }) => (
            <View>
              <View style={styles.form}>
                <TextInput
                  mode="outlined"
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                />
                <Text style={{ color: "red" }}>{errors.email}</Text>
                <TextInput
                  mode="outlined"
                  label="Password"
                  value={values.password}
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                />
                <Text style={{ color: "red" }}>{errors.password}</Text>
              </View>
              <RadioButton.Group
                onValueChange={handleChange("type")}
                value={values.type}
              >
                <View style={styles.roles}>
                  <View style={styles.role}>
                    <Text>Patient</Text>
                    <RadioButton value="patient" />
                  </View>
                  <View style={styles.role}>
                    <Text>Hospital</Text>
                    <RadioButton value="hospital" />
                  </View>
                </View>
              </RadioButton.Group>
              <Button
                icon="account-arrow-left"
                mode="contained"
                onPress={handleSubmit}
              >
                Login
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: 60,
    // width: 20,
    marginHorizontal: 50,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 25,
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    // fontWeight: "bold",
    // fontFamily: "Montserrat",
  },
  form: {
    paddingVertical: 1,
  },
  roles: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    // textAlign: "center",
  },
  role: {
    padding: 4,
  },
});

export default Login;
