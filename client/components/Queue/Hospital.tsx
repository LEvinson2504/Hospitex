import React from "react";
import { View } from "../UI/Themed";
import { Title, List, Button, Subheading } from "react-native-paper";

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
  hospital: HospitalProps;
  setCurrentDisplay: React.Dispatch<React.SetStateAction<number>>;
}

const Hospital: React.FC<Props> = ({ hospital, setCurrentDisplay }) => {
  return (
    <View>
      <Button
        onPress={() => {
          setCurrentDisplay(0);
        }}
      >
        Go Back
      </Button>
      <Title>{hospital.username}</Title>
      <Subheading>List of Doctors: </Subheading>
      <List.Section>
        {hospital.doctors.map((doctor) => (
          <List.Item key={doctor._id} title={doctor.username} />
        ))}
      </List.Section>
    </View>
  );
};

export default Hospital;
