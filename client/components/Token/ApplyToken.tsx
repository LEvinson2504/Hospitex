import React, { useContext } from "react";
import { View } from "../Themed";
import { Title, Button } from "react-native-paper";
import { UserContext } from "../../contexts/UserContext";

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
  const { id } = useContext(UserContext);

  return (
    <View>
      <Button
        onPress={async () => {
          try {
            console.log(`[Queue] Sending register-queue, ${id}`);
            socket.emit("register-queue", id);
            setIsTokenRegistered(true);
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
