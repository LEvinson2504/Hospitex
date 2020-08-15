import React, { useState, useRef } from "react";
import { View } from "../UI/Themed";
import HospitalList from "./HospitalList";
import Hospital from "./Hospital";
import { HospitalProps } from "../types";

interface Props {
  tokenId: string;
  queues: number[];
  setQueues: React.Dispatch<React.SetStateAction<number[]>>;
  isTokenRegistered: boolean;
  setIsTokenRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  socket: SocketIOClient.Socket;
  setTokenId: React.Dispatch<React.SetStateAction<string>>;
  queuesRef: React.MutableRefObject<number[]>;
  hospitals: HospitalProps[];
}
const Queue: React.FC<Props> = ({
  hospitals,
  queues,
  setIsTokenRegistered,
  socket,
  queuesRef,
  setQueues,
}) => {
  const hospitalsRef = useRef(hospitals);
  hospitalsRef.current = [];

  console.log(`[Queue]: ${queues}`);
  return (
    <View>
      <HospitalList
        socket={socket}
        hospitals={hospitals}
        queues={queues}
        setQueues={setQueues}
        queuesRef={queuesRef}
        setIsTokenRegistered={setIsTokenRegistered}
      />
    </View>
  );
};

export default Queue;
