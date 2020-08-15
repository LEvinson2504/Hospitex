import React, { useState, useContext } from "react";
import { Button } from "react-native-paper";
import { RegisterQueue } from "../Sockets/registerQueue";
import { HospitalProps } from "../types";
import { UserContext } from "../../contexts/UserContext";
import { CancelQueue } from "../Sockets/CancelQueue";

interface Props {
  hospital: HospitalProps;
  socket: SocketIOClient.Socket;
  setIsTokenRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  setQueues: React.Dispatch<React.SetStateAction<number[]>>;
}

const QueueController: React.FC<Props> = ({
  hospital,
  socket,
  setIsTokenRegistered,
  setQueues,
}) => {
  const { id } = useContext(UserContext);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  return (
    <Button
      onPress={() => {
        if (!isRegistered) {
          RegisterQueue({
            hospitalId: hospital._id,
            userId: id,
            socket,
            setIsTokenRegistered,
          });
        } else {
          CancelQueue({
            hospitalId: hospital._id,
            socket,
            setQueues,
            userId: id,
          });
          setIsTokenRegistered(false);
        }
        setIsRegistered(!isRegistered);
      }}
    >
      {isRegistered ? "Cancel Queue" : "Register Queue"}
    </Button>
  );
};

export default QueueController;
