import React, { useState, useEffect, useContext, useRef } from "react";
import { StyleSheet } from "react-native";

import RegisteredToken from "../components/Token/RegisteredToken";
import ApplyToken from "../components/Token/ApplyToken";
import Auth from "../components/Auth/Auth";
import { UserContext } from "../contexts/UserContext";
import Admin from "../components/Admin/Admin";
import { View } from "../components/UI/Themed";
import { InitSocket } from "../components/Sockets/InitSocket";
import { CheckAuthStatus } from "../components/Auth/CheckAuthStatus";
import Logout from "../components/Auth/Logout";
import { roles } from "../constants/Roles";
import AuthInfo from "../components/Auth/AuthInfo";
import Queue from "../components/Queue/Queue";
import { isLoggedInContext } from "../contexts/isLoggedInContext";

const socket = InitSocket();

const TabOneScreen: React.FC = () => {
  const { setIsLoggedIn } = useContext(isLoggedInContext);
  const { role, setUser } = useContext(UserContext);
  const [isTokenRegistered, setIsTokenRegistered] = useState<boolean>(false);
  const [tokenId, setTokenId] = useState<string>("");
  const [queue, setQueue] = useState<number>();

  let display: JSX.Element;

  useEffect(() => {
    socket.emit("init", "[Client] Client has connected to socket");
  }, []);

  console.log(`[Auth] role: ${role}`);
  switch (role) {
    case roles.hospital:
      display = (
        <Admin
          socket={socket}
          setIsTokenRegistered={setIsTokenRegistered}
          setTokenId={setTokenId}
          setQueue={setQueue}
        />
      );
      break;
    case roles.patient:
      display = (
        <Queue
          tokenId={tokenId}
          setTokenId={setTokenId}
          queue={queue}
          setQueue={setQueue}
          isTokenRegistered={isTokenRegistered}
          setIsTokenRegistered={setIsTokenRegistered}
          socket={socket}
        />
      );
      break;
    default:
      display = (
        <Queue
          tokenId={tokenId}
          setTokenId={setTokenId}
          queue={queue}
          setQueue={setQueue}
          isTokenRegistered={isTokenRegistered}
          setIsTokenRegistered={setIsTokenRegistered}
          socket={socket}
        />
      );
  }

  return (
    <View style={styles.container}>
      {/* <AuthInfo /> */}
      <View>{display}</View>
      <View>
        <Logout setIsLoggedIn={setIsLoggedIn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default TabOneScreen;
