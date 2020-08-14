import React, { useState, useEffect, useContext, useRef } from "react";
import { StyleSheet } from "react-native";

import { View } from "../components/Themed";

import { Title, Button, Subheading } from "react-native-paper";
import io from "socket.io-client";
import RegisteredToken from "../components/Token/RegisteredToken";
import ApplyToken from "../components/Token/ApplyToken";
import Auth from "../components/Auth/Auth";
import Axios from "axios";
import { UserContext } from "../contexts/UserContext";
import Admin from "../components/Admin";
import { baseURL } from "../baseURL";

const checkAuth = async () => {
  const response = await Axios({
    method: "GET",
    url: `${baseURL}/auth/me`,
  });
  return response.data;
};

let socket: SocketIOClient.Socket;
socket = io(baseURL);
socket.on("connection", () => {
  console.log(`[Queue] Initializing Queue`);
});

const TabOneScreen: React.FC = () => {
  const { id, username, role, setUser } = useContext(UserContext);
  const [isTokenRegistered, setIsTokenRegistered] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [tokenId, setTokenId] = useState<string>("");
  const [queue, setQueue] = useState<number>();

  let appComponent: JSX.Element = <View></View>;

  useEffect(() => {
    socket.on("display-queue", (queueLength: number) => {
      console.log(`Updating queue: ${queue}`);
      setQueue(queueLength);
    });

    socket.emit("init", "[Client] Client has connected to socket");
  }, []);

  useEffect(() => {
    checkAuth().then((response) => {
      if (response.user) {
        setUser({
          id: response.user._id,
          username: response.user.username,
          role: response.user.role,
        });

        setIsLoggedIn(true);
      }
    });
  }, []);
  console.log(`Queue: ${queue}`);
  appComponent = (
    <View style={styles.container}>
      <Title>
        Welcome, {role} {username}
      </Title>
      <Subheading>Your id is {id}</Subheading>
      <Title>Queue: {queue}</Title>
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
      <View>
        {role === "hospital" ? (
          <Admin
            socket={socket}
            setIsTokenRegistered={setIsTokenRegistered}
            setTokenId={setTokenId}
            setQueue={setQueue}
          />
        ) : (
          <View></View>
        )}
      </View>
      <View>
        <Button
          onPress={async () => {
            try {
              console.log(`[Auth] trying to logout...`);
              const response = await Axios({
                method: "GET",
                url: `${baseURL}/auth/logout`,
              });
              console.log(response.data);
              setIsLoggedIn(false);
            } catch (err) {
              console.log("Error");
              console.log(err.message);
            }
          }}
        >
          Logout
        </Button>
      </View>
    </View>
  );
  console.log(`[Auth] isLoggedIn: ${isLoggedIn}`);
  return isLoggedIn ? appComponent : <Auth setIsLoggedIn={setIsLoggedIn} />;
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
