import React from "react";

interface Props {
  socket: SocketIOClient.Socket;
  setQueue: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const DisplayQueue = ({ socket, setQueue }: Props) => {
  socket.on("display-queue", (queueLength: number) => {
    console.log(`[Queue] Updating queue.`);
    setQueue(queueLength);
  });
};
