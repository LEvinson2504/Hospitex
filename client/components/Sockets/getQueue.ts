import React from "react";
import { getQueue } from "./socketUtils";

interface Props {
  hospitalId: string;
  socket: SocketIOClient.Socket;
  setIsTokenRegistered: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GetQueue = ({ hospitalId, socket }: Props) => {
  socket.emit(`${hospitalId}-${getQueue}`);
};
