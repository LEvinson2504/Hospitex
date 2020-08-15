import React, { useState } from "react";
import { View } from "../UI/Themed";
import { Title, Button } from "react-native-paper";
import AddDoctor from "../Doctors/AddDoctor";
import Doctors from "../Doctors/Doctors";
import AdminPanel from "./AdminPanel";

type Props = {
  socket: SocketIOClient.Socket;
  setIsTokenRegistered: (bool: boolean) => void;
  setTokenId: (tokenId: string) => void;
  setQueue: (queue: number) => void;
};

const Admin: React.FC<Props> = ({
  socket,
  setIsTokenRegistered,
  setTokenId,
  setQueue,
}) => {
  const [displays, setDisplays] = useState([
    <AdminPanel
      socket={socket}
      setIsTokenRegistered={setIsTokenRegistered}
      setTokenId={setTokenId}
      setQueue={setQueue}
    />,
    <Doctors />,
  ]);
  const [currentDisplay, setCurrentDisplay] = useState<number>(0);

  return (
    <View>
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
