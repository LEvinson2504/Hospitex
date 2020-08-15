import React from "react";
import { StyleSheet } from "react-native";

import { View, Text } from "../UI/Themed";
import { Formik } from "formik";
import { TextInput, RadioButton, Button } from "react-native-paper";
import { baseURL } from "../../baseURL";
import Axios from "axios";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().label("Name").required("Please enter your name"),
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required("Please enter a password")
    .min(4, "Password must have at least 4 characters "),
  phone: Yup.string().label("Phone").required("Please enter your phone number"),
  role: Yup.string().label("Role").required("Are you a patient or doctor?"),
});

const Register: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTER</Text>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        <Formik
          onSubmit={async (values) => {
            Axios({
              method: "POST",
              url: `${baseURL}/auth/${
                values.role === "hospital" ? "hospital" : "user"
              }/register`,
              data: values,
            })
              .then((response) => {})
              .catch((err) => {});
          }}
          initialValues={{
            name: "",
            email: "",
            password: "",
            phone: "",
            role: "patient",
          }}
          validationSchema={validationSchema}
        >
          {({ values, handleSubmit, handleChange, errors }) => (
            <View>
              <View style={styles.form}>
                <TextInput
                  mode="outlined"
                  label="Name"
                  value={values.name}
                  onChangeText={handleChange("name")}
                />
                <Text style={{ color: "red" }}>{errors.name}</Text>

                <TextInput
                  mode="outlined"
                  label="Password"
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={handleChange("password")}
                />

                <Text style={{ color: "red" }}>{errors.password}</Text>
                <TextInput
                  mode="outlined"
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                />
                <Text style={{ color: "red" }}>{errors.email}</Text>

                <TextInput
                  mode="outlined"
                  label="Phone"
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                />
                <Text style={{ color: "red" }}>{errors.phone}</Text>
              </View>

              <RadioButton.Group
                onValueChange={handleChange("role")}
                value={values.role}
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
                icon="account-plus"
                mode="contained"
                onPress={handleSubmit}
              >
                Register
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
  form: {},
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

export default Register;
