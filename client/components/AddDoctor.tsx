import { View, Text } from "./Themed";
import { Button, RadioButton, TextInput } from "react-native-paper";
import { Formik } from "formik";
import Axios from "axios";
import { baseURL } from "../baseURL";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().label("Username").required(),
  password: Yup.string()
    .label("Password")
    .required()
    .min(4, "Password must have at least 4 characters "),
});

const AddDoctor: React.FC = () => {
  return (
    <View>
      <Text>Register</Text>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        <Formik
          onSubmit={async (values) => {
            const response = await Axios({
              method: "POST",
              url: `${baseURL}/hospital/add-doctor`,
              data: values,
            });
            console.log(response.data);
            if (response.data) {
              // add notification succesful here
            } else {
              // add fail notification
            }
          }}
          initialValues={{
            username: "",
            password: "",
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
              <TextInput
                label="Password"
                value={values.password}
                onChangeText={handleChange("password")}
              />
              <Text style={{ color: "red" }}>{errors.password}</Text>
              <Button onPress={handleSubmit}>Add Doctor</Button>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default AddDoctor;
