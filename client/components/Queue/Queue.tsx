import React from "react";
import { View } from "../UI/Themed";
import RegisteredToken from "../Token/RegisteredToken";
import ApplyToken from "../Token/ApplyToken";

interface Props {
  tokenId: string;
  queue: number | undefined;
  setQueue: React.Dispatch<React.SetStateAction<number | undefined>>;
  isTokenRegistered: boolean;
  setIsTokenRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  socket: SocketIOClient.Socket;
  setTokenId: React.Dispatch<React.SetStateAction<string>>;
}
const Queue: React.FC<Props> = ({
  tokenId,
  queue,
  isTokenRegistered,
  setIsTokenRegistered,
  socket,
  setTokenId,
  setQueue,
}) => {
  return (
    <View>
      {isTokenRegistered && queue ? (
        <RegisteredToken
          tokenId={tokenId}
          queue={queue}
          setIsTokenRegistered={setIsTokenRegistered}
        />
      ) : (
        <ApplyToken
          socket={socket}
          setIsTokenRegistered={setIsTokenRegistered}
          setTokenId={setTokenId}
          setQueue={setQueue}
        />
      )}
    </View>
  );
};

export default Queue;
