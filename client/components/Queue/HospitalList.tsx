import React from "react";
import { List, Title } from "react-native-paper";
import { View } from "../UI/Themed";

interface DoctorProps {
  _id: string;
  username: string;
  role: string;
  hospital: string;
}

interface HospitalProps {
  _id: string;
  username: string;
  doctors: DoctorProps[];
}

interface Props {
  hospitals: HospitalProps[];
  currentHospitalRef: React.MutableRefObject<HospitalProps>;
  setCurrentHospital: React.Dispatch<React.SetStateAction<HospitalProps>>;
  setCurrentDisplay: React.Dispatch<React.SetStateAction<number>>;
}

const HospitalList: React.FC<Props> = ({
  hospitals,
  currentHospitalRef,
  setCurrentDisplay,
  setCurrentHospital,
}) => {
  return (
    <View>
      <Title>List of Hospitals</Title>
      <List.Section>
        {hospitals.map((hospital, index) => (
          <List.Item
            key={`${hospital._id}`}
            title={`${index + 1}: ${hospital.username}`}
            onPress={() => {
              setCurrentHospital({ ...hospital });
              currentHospitalRef.current = hospital;
              setCurrentDisplay(1);
            }}
          />
        ))}
      </List.Section>
    </View>
  );
};

export default HospitalList;
