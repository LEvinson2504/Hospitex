import React from "react";
import { View } from "../Themed";
import { Title, Button } from "react-native-paper";

type Props = {
  socket: SocketIOClient.Socket;
  setIsTokenRegistered: (bool: boolean) => void;
  setTokenId: (tokenId: string) => void;
  setQueue: (queue: number) => void;
};

const ApplyToken: React.FC<Props> = ({
  socket,
  setIsTokenRegistered,
  setTokenId,
  setQueue,
}) => {
  return (
    <View>
      <Button
        onPress={async () => {
          try {
            socket.emit("register-token");
            setIsTokenRegistered(true);
            setTokenId("tokenId from server here");
          } catch (err) {
            console.log(err);
          }
        }}
      >
        Register for queue
      </Button>
    </View>
  );
};

export default ApplyToken;
