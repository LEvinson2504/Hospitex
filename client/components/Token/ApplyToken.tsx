import React, { useContext } from "react";
import { View } from "../UI/Themed";
import { Title, Button } from "react-native-paper";
import { UserContext } from "../../contexts/UserContext";
import { registerQueue } from "../Sockets/socketUtils";
import { HospitalProps } from "../types";
import { RegisterQueue } from "../Sockets/registerQueue";

type Props = {
  socket: SocketIOClient.Socket;
  setIsTokenRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  setTokenId: (tokenId: string) => void;
  setQueues: React.Dispatch<React.SetStateAction<number[]>>;
  hospital: HospitalProps;
};

const ApplyToken: React.FC<Props> = ({
  socket,
  setIsTokenRegistered,
  setTokenId,
  setQueues,
  hospital,
}) => {
  const { id } = useContext(UserContext);

  return (
    <View>
      <Button
        onPress={async () => {
          RegisterQueue({
            hospitalId: hospital._id,
            userId: id,
            socket,
            setIsTokenRegistered,
          });
        }}
      >
        Register for queue
      </Button>
    </View>
  );
};

export default ApplyToken;
