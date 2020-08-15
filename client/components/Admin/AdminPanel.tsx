import React from "react";
import { Title, Button } from "react-native-paper";
import { View } from "../UI/Themed";
import { HospitalProps } from "../types";
import { DeleteQueues } from "../Sockets/DeleteQueues";

type Props = {
  socket: SocketIOClient.Socket;
  setIsTokenRegistered: (bool: boolean) => void;
  setTokenId: (tokenId: string) => void;
  setQueues: React.Dispatch<React.SetStateAction<number[]>>;
  hospitals: HospitalProps[];
};

const AdminPanel: React.FC<Props> = ({
  socket,
  setIsTokenRegistered,
  setTokenId,
  setQueues,
  hospitals,
}) => {
  return (
    <View>
      <Button
        onPress={async () => {
          hospitals.forEach((hospital, index) => {
            DeleteQueues({
              hospitalId: hospital._id,
              socket,
              setQueues,
            });
          });
        }}
      >
        Mr Clean
      </Button>
      <Button onPress={async () => {}}>Take Queue</Button>
      <Button onPress={async () => {}}>Finish Queue</Button>
    </View>
  );
};

export default AdminPanel;
