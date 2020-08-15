import React from "react";
import { View } from "../UI/Themed";
import { Title, List } from "react-native-paper";

export interface DoctorProps {
  _id: string;
  username: string;
  password: string;
}

export interface Props {
  doctors: DoctorProps[];
}

const DoctorList: React.FC<Props> = ({ doctors }) => {
  return (
    <View>
      <Title>List of doctors</Title>
      <List.Section>
        {doctors.map((doctor) => (
          <List.Item key={doctor._id} title={doctor.username} />
        ))}
      </List.Section>
    </View>
  );
};

export default DoctorList;
