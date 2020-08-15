import React from "react";
import { displayQueue, registerQueue } from "./socketUtils";

interface Props {
  hospitalId: string;
  userId: string;
  socket: SocketIOClient.Socket;
  setIsTokenRegistered: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegisterQueue = ({
  hospitalId,
  userId,
  socket,
  setIsTokenRegistered,
}: Props) => {
  socket.emit(`${hospitalId}-${registerQueue}`, userId);
  setIsTokenRegistered(true);
};
