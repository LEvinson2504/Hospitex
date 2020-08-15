import React from "react";
import { displayQueue, deleteQueue, cancelQueue } from "./socketUtils";

interface Props {
  hospitalId: string;
  userId: string;
  socket: SocketIOClient.Socket;
  setQueues: React.Dispatch<React.SetStateAction<number[]>>;
}

export const CancelQueue = ({
  hospitalId,
  socket,
  setQueues,
  userId,
}: Props) => {
  socket.emit(`${hospitalId}-${cancelQueue}`, userId);
  console.log(`[Queue] Deleting all queues`);
};
