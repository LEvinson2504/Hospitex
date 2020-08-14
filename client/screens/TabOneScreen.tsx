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

const checkAuth = async () => {
  const response = await Axios({
    method: "GET",
    url: "http://10.0.2.2:3000/auth/me",
    withCredentials: true,
  });
  return response.data;
};
let socket: SocketIOClient.Socket;
socket = io("http://10.0.2.2:3000");
socket.on("connection", () => {
  console.log(" kuda user logged in");
});

const TabOneScreen: React.FC = () => {
  const { id, username, role, setUser } = useContext(UserContext);
  const [isTokenRegistered, setIsTokenRegistered] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [tokenId, setTokenId] = useState<string>("");
  const [queue, setQueue] = useState<number>();

  const queueRef = useRef(queue);
  queueRef.current;

  let appComponent: JSX.Element = <View></View>;

  useEffect(() => {
    checkAuth().then((response) => {
      if (response.user) {
        setUser({
          id: response.user._id,
          username: response.user.username,
          role: response.user.role,
        });

        socket.emit("init", "[Client] Client has connected to socket");

        socket.on("display-queue", (queueLength: number) => {
          console.log("setting new length", queueLength);
          setQueue(queueLength);
          queueRef.current = queueLength;
        });

        setIsLoggedIn(true);
      }
    });
  }, []);

  appComponent =
    queueRef.current === undefined || queueRef.current === null ? (
      <View></View>
    ) : (
      <View style={styles.container}>
        <Title>
          Welcome, {role} {username}
        </Title>
        <Subheading>Your id is {id}</Subheading>
        <Title>Queue: {queue}</Title>
        <View>
          {isTokenRegistered ? (
            <RegisteredToken
              tokenId={tokenId}
              queue={queueRef.current}
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
          {role === "doctor" ? (
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
                const response = await Axios({
                  method: "GET",
                  url: "http://10.0.2.2:3000/auth/logout",
                  withCredentials: true,
                });
                console.log(response);
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
