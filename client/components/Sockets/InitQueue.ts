import React from "react";
import { displayQueue, initializeQueue } from "./socketUtils";

interface Props {
  hospitalId: string;
  socket: SocketIOClient.Socket;
}

export const InitQueue = ({ hospitalId, socket }: Props) => {
  socket.emit(
    `${hospitalId}-${initializeQueue}`,
    "[Client] Client has entered a hospital"
  );
};
