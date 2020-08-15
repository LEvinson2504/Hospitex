import React, { useEffect, useState, useContext } from "react";
import { View } from "./Themed";
import Axios from "axios";
import { baseURL } from "../baseURL";
import { Title, Button, List } from "react-native-paper";
import AddDoctor from "./AddDoctor";
import DoctorList from "./Doctors/DoctorList";
import { UserContext } from "../contexts/UserContext";

export interface DoctorProps {
  _id: string;
  username: string;
  password: string;
}

export interface Props {
  doctors: DoctorProps[];
}
const Doctors: React.FC = () => {
  const { id } = useContext(UserContext);
  const [display, setDisplay] = useState([]);
  const [currentDisplay, setCurrentDisplay] = useState<number>(0);
  const [doctors, setDoctors] = useState<DoctorProps[]>([]);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `${baseURL}/hospital/get-doctors/${id}`,
    })
      .then((response) => {
        if (response.data && response.data.doctors) {
          console.log("doctors: ");
          setDoctors(response.data.doctors);
        }
      })
      .catch((err) => console.log(err.message));
  }, [currentDisplay]);

  return (
    <View>
      <View>
        {currentDisplay === 0 ? (
          <DoctorList doctors={doctors} />
        ) : (
          <AddDoctor doctors={doctors} />
        )}
      </View>
      <View>
        <Button
          onPress={() => {
            setCurrentDisplay(currentDisplay === 0 ? 1 : 0);
          }}
        >
          {currentDisplay === 0 ? "Add Doctors" : "Doctors"}
        </Button>
      </View>
    </View>
  );
};

export default Doctors;
