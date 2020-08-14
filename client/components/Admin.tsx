import React from "react";
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
  return (
    <View>
      <Title>Admin SITE</Title>
      <Button
        onPress={async () => {
          console.log("Sending request to delete tokens");

          try {
            await socket.emit("delete-queue");
            setIsTokenRegistered(false);
            setTokenId("tokenId from server here");
            setQueue(0);
          } catch (err) {}
        }}
      >
        Mr Clean
      </Button>
      <Button onPress={async () => {}}>Take Queue</Button>
      <Button onPress={async () => {}}>Finish Queue</Button>
    </View>
  );
};

export default Admin;
