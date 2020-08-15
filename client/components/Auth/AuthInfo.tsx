import React, { useContext } from "react";
import { View } from "../UI/Themed";
import { UserContext } from "../../contexts/UserContext";
import { Title, Subheading } from "react-native-paper";

const AuthInfo: React.FC = () => {
  const { id, email, role } = useContext(UserContext);
  return (
    <View>
      <Title>
        Welcome, {role} {email}
      </Title>
      <Subheading>Your id is {id}</Subheading>
    </View>
  );
};

export default AuthInfo;
