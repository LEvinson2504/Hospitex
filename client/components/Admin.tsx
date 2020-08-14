import React, { useState } from "react";
import AdminPanel from "./AdminPanel";
import { View } from "./Themed";
import { Title, Button } from "react-native-paper";

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
  ]);
  const [currentDisplay, setCurrentDisplay] = useState<number>(0);

  return (
    <View>
      <Button
        onPress={() => {
          setCurrentDisplay(currentDisplay === 0 ? 1 : 0);
        }}
      >
        {currentDisplay === 0 ? "Add Doctors" : "Admin Panel"}
      </Button>
      <View>{displays[currentDisplay]}</View>
    </View>
  );
};

export default Admin;
