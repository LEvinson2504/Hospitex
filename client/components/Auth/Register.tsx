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
    <View>
      <Text>REGISTER</Text>
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
              <View>
                <TextInput
                  mode="outlined"
                  label="Name"
                  value={values.name}
                  onChangeText={handleChange("name")}
                />
                <Text>{errors.name}</Text>

                <TextInput
                  mode="outlined"
                  label="Password"
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={handleChange("password")}
                />

                <Text>{errors.password}</Text>
                <TextInput
                  mode="outlined"
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                />
                <Text>{errors.email}</Text>

                <TextInput
                  mode="outlined"
                  label="Phone"
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                />
                <Text>{errors.phone}</Text>
              </View>

              <RadioButton.Group
                onValueChange={handleChange("role")}
                value={values.role}
              >
                <View>
                  <View>
                    <Text>Patient</Text>
                    <RadioButton value="patient" />
                  </View>
                  <View>
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

export default Register;
