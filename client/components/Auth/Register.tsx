import React from "react";

import { View, Text } from "../Themed";
import { Formik } from "formik";
import Axios from "axios";
import { TextInput, RadioButton, Button } from "react-native-paper";

const Register: React.FC = () => {
  return (
    <View>
      <Text>Register baus</Text>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        <Formik
          onSubmit={async (values) => {
            console.log(values);

            const response = await Axios({
              method: "POST",
              url: "http://10.0.2.2:3000/auth/register",
              data: values,
            });
            console.log(response);
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
