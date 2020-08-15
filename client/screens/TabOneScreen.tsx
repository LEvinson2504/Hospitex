import React, { useState, useEffect, useContext, useRef } from "react";
import { StyleSheet } from "react-native";

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
import { DisplayQueue } from "../components/Sockets/DisplayQueue";
import Axios from "axios";
import { baseURL } from "../baseURL";
import { displayQueue } from "../components/Sockets/socketUtils";
import { HospitalProps } from "../components/types";
import { InitQueue } from "../components/Sockets/InitQueue";

const socket = InitSocket();

const TabOneScreen: React.FC = () => {
  const [queues, setQueues] = useState<number[]>([]);
  const [hospitals, setHospitals] = useState<HospitalProps[]>([]);
  const [isTokenRegistered, setIsTokenRegistered] = useState<boolean>(false);

  const [tokenId, setTokenId] = useState<string>("");

  const { setIsLoggedIn } = useContext(isLoggedInContext);
  const { role } = useContext(UserContext);

  const hospitalsRef = useRef(hospitals);
  hospitalsRef.current = [];

  const queuesRef = useRef(queues);
  console.log(queuesRef.current);

  let display: JSX.Element;

  useEffect(() => {
    Axios({
      method: "GET",
      url: `${baseURL}/hospital/get-hospitals`,
    })
      .then((response) => {
        if (response.data && response.data.hospitals) {
          const hospitals = response.data.hospitals;
          setHospitals(hospitals);
          hospitalsRef.current = hospitals;

          hospitals.forEach((hospital: HospitalProps, index: number) => {
            InitQueue({
              hospitalId: hospital._id,
              socket,
            });
            DisplayQueue({
              hospitalId: hospital._id,
              index,
              socket,
              queues,
              queuesRef,
              setQueues,
            });
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(`[Auth] role: ${role}`);
  console.log(queues);
  switch (role) {
    case roles.hospital:
      display = (
        <Admin
          socket={socket}
          setIsTokenRegistered={setIsTokenRegistered}
          setTokenId={setTokenId}
          setQueues={setQueues}
          hospitals={hospitals}
        />
      );
      break;
    case roles.patient:
      display = (
        <Queue
          tokenId={tokenId}
          setTokenId={setTokenId}
          queuesRef={queuesRef}
          queues={queues}
          setQueues={setQueues}
          isTokenRegistered={isTokenRegistered}
          setIsTokenRegistered={setIsTokenRegistered}
          socket={socket}
          hospitals={hospitals}
        />
      );
      break;
    default:
      display = (
        <Queue
          tokenId={tokenId}
          setTokenId={setTokenId}
          queuesRef={queuesRef}
          queues={queues}
          setQueues={setQueues}
          isTokenRegistered={isTokenRegistered}
          setIsTokenRegistered={setIsTokenRegistered}
          socket={socket}
          hospitals={hospitals}
        />
      );
  }

  return (
    <View style={styles.container}>
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
