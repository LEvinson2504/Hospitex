import React from "react";
import { displayQueue } from "./socketUtils";

interface Props {
  hospitalId: string;
  index: number;
  socket: SocketIOClient.Socket;
  queues: Array<number>;
  setQueues: React.Dispatch<React.SetStateAction<number[]>>;
  queuesRef: React.MutableRefObject<number[]>;
}

export const DisplayQueue = ({
  hospitalId,
  index,
  socket,
  queues,
  queuesRef,
  setQueues,
}: Props) => {
  socket.on(`${hospitalId}-${displayQueue}`, (queueLength: number) => {
    console.log(`[Queue] Updating queue for ${hospitalId}`);

    console.log(queues);
    const newQueues = [...queuesRef.current];
    newQueues[index] = queueLength;
    console.log(`index: ${index}`);
    setQueues(newQueues);
    queuesRef.current = newQueues;
  });
};
