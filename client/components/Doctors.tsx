import React, { useEffect, useState } from "react";
import { View } from "./Themed";
import Axios from "axios";
import { baseURL } from "../baseURL";
import { Title, Button } from "react-native-paper";
import AddDoctor from "./AddDoctor";

const Doctors: React.FC = () => {
  const [display, setDisplay] = useState([]);
  const [currentDisplay, setCurrentDisplay] = useState<number>(0);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `${baseURL}/hospital/get-doctors`,
    })
      .then((response) => {
        if (response.data) {
          console.log("doctors: ");
          console.log(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, [doctors]);

  let renderDoctors = doctors.map((doctor) => (
    <View>
      <Title>asd</Title>
    </View>
  ));
  return (
    <View>
      <View>
        {currentDisplay === 0 ? renderDoctors : <AddDoctor doctors={doctors} />}
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
