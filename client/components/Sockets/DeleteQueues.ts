import React from "react";
import { displayQueue, deleteQueue } from "./socketUtils";

interface Props {
  hospitalId: string;
  socket: SocketIOClient.Socket;
  setQueues: React.Dispatch<React.SetStateAction<number[]>>;
}

export const DeleteQueues = ({ hospitalId, socket, setQueues }: Props) => {
  socket.emit(`${hospitalId}-${deleteQueue}`);
  console.log(`[Queue] Deleting all queues`);
};
