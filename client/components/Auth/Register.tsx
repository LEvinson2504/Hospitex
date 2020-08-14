import React from "react";

import { View, Text } from "../Themed";
import { Formik } from "formik";
import { TextInput, RadioButton, Button } from "react-native-paper";
import { baseURL } from "../../baseURL";
import Axios from "axios";

const Register: React.FC = () => {
  return (
    <View>
      <Text>Register</Text>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        <Formik
          onSubmit={async (values) => {
            const response = await Axios({
              method: "POST",
              url: `${baseURL}/auth/register`,
              data: values,
            });
          }}
          initialValues={{
            username: "",
            password: "",
            type: "patient",
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
              </RadioButton.Group>

              <Button onPress={handleSubmit}>Register</Button>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Register;
