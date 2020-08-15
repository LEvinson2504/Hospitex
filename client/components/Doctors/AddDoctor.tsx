import React, { useContext, useState, useEffect } from "react";
import { View, Text } from "../UI/Themed";
import { Button, RadioButton, TextInput } from "react-native-paper";
import { Formik } from "formik";
import Axios from "axios";
import { baseURL } from "../../baseURL";
import * as Yup from "yup";
import { UserContext } from "../../contexts/UserContext";
import { Checkbox } from "react-native-paper";

export interface DoctorProps {
  _id: string;
  username: string;
  password: string;
}

export interface Props {
  doctors: DoctorProps[];
}

const validationSchema = Yup.object().shape({
  username: Yup.string().label("Username").required(),
  password: Yup.string()
    .label("Password")
    .required()
    .min(4, "Password must have at least 4 characters "),
});

const AddDoctor: React.FC<Props> = ({ doctors }) => {
  const [allDoctors, setAllDoctors] = useState<DoctorProps[]>([]);
  const [checked, setChecked] = useState<boolean[]>([]);
  const { id } = useContext(UserContext);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `${baseURL}/hospital/get-doctors`,
    })
      .then((response) => {
        if (response.data && response.data.doctors) {
          const allDoctorIds = response.data.doctors.map(
            (doctor: DoctorProps) => {
              return doctor._id;
            }
          );

          const newChecked = doctors.map((doctor: DoctorProps) => {
            return allDoctorIds.includes(doctor._id);
          });
          setChecked(newChecked);
          setAllDoctors(response.data.doctors);
        }
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <View>
      <Text>Add a doctor</Text>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        {allDoctors.map((doctor, index) => (
          <View key={doctor._id}>
            <Checkbox
              status={checked[index] ? "checked" : "unchecked"}
              onPress={async () => {
                const newCheck = [...checked];
                newCheck[index] = !checked[index];
                setChecked(newCheck);

                Axios({
                  method: "POST",
                  url: `${baseURL}/hospital/${
                    newCheck[index] ? "push-doctor" : "pop-doctor"
                  }`,
                  data: {
                    doctorId: doctor._id,
                    hospitalId: id,
                  },
                })
                  .then((response) => {
                    if (response.data && response.data.hospital) {
                      console.log(response.data.hospital);
                    }
                  })
                  .catch((err) => {
                    console.log(err.message);
                  });
              }}
            />
            <Text>{doctor.username}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default AddDoctor;
