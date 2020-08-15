import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "../UI/Themed";
import { Button } from "react-native-paper";
import Doctors from "../Doctors/Doctors";
import AdminPanel from "./AdminPanel";
import { HospitalProps, UserProps } from "../types";
import { UserContext } from "../../contexts/UserContext";
import { GetQueue } from "../Sockets/getQueue";
import { ReceiveQueue } from "../Sockets/receiveQueue";

type Props = {
  socket: SocketIOClient.Socket;
  setIsTokenRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  setTokenId: (tokenId: string) => void;
  setQueues: React.Dispatch<React.SetStateAction<number[]>>;
  hospitals: HospitalProps[];
};

const Admin: React.FC<Props> = ({
  socket,
  setIsTokenRegistered,
  setTokenId,
  setQueues,
  hospitals,
}) => {
  const [displays, setDisplays] = useState([
    <AdminPanel
      socket={socket}
      setIsTokenRegistered={setIsTokenRegistered}
      setTokenId={setTokenId}
      setQueues={setQueues}
      hospitals={hospitals}
    />,
    <Doctors />,
  ]);
  const { id } = useContext(UserContext);
  const [currentDisplay, setCurrentDisplay] = useState<number>(0);
  const [hospitalQueues, setHospitalQueues] = useState<UserProps[]>([]);

  useEffect(() => {
    GetQueue({ hospitalId: id, setIsTokenRegistered, socket });
    ReceiveQueue({ hospitalId: id, socket, setHospitalQueues });
  }, []);
  console.log(`[Admin Queue] hospitalQueues: ${hospitalQueues}`);
  return (
    <View>
      <View>
        {hospitalQueues.map((queue) => {
          return <Text>{queue}</Text>;
        })}
      </View>
      <Button
        onPress={() => {
          setCurrentDisplay(currentDisplay === 0 ? 1 : 0);
        }}
      >
        {currentDisplay === 0 ? "Doctors" : "Admin Panel"}
      </Button>
      <View>{displays[currentDisplay]}</View>
    </View>
  );
};

export default Admin;
