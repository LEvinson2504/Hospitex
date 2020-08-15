import React from "react";
import { View } from "../UI/Themed";
import { Title, List, Button, Subheading } from "react-native-paper";
import ApplyToken from "../Token/ApplyToken";
import RegisteredToken from "../Token/RegisteredToken";
import { HospitalProps } from "../types";

interface Props {
  hospital: HospitalProps;
  isTokenRegistered: boolean;
  setCurrentDisplay: React.Dispatch<React.SetStateAction<number>>;
  setIsTokenRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  queue: number;
  tokenId: string;
  socket: SocketIOClient.Socket;
  setTokenId: React.Dispatch<React.SetStateAction<string>>;
  setQueues: React.Dispatch<React.SetStateAction<number[]>>;
}

const Hospital: React.FC<Props> = ({
  hospital,
  setQueues,
  socket,
  setTokenId,
  tokenId,
  setCurrentDisplay,
  isTokenRegistered,
  queue,
  setIsTokenRegistered,
}) => {
  return (
    <View>
      <Button
        onPress={() => {
          setCurrentDisplay(0);
        }}
      >
        List of Hospitals
      </Button>
      <Title>{hospital.name}</Title>
      <View>
        {isTokenRegistered && queue ? (
          <RegisteredToken
            tokenId={tokenId}
            queue={queue}
            setIsTokenRegistered={setIsTokenRegistered}
          />
        ) : (
          <ApplyToken
            socket={socket}
            setIsTokenRegistered={setIsTokenRegistered}
            setTokenId={setTokenId}
            setQueues={setQueues}
            hospital={hospital}
          />
        )}
      </View>
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
