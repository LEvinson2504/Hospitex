import React, { useState, useEffect, useRef } from "react";
import { View } from "../UI/Themed";
import RegisteredToken from "../Token/RegisteredToken";
import ApplyToken from "../Token/ApplyToken";
import Axios from "axios";
import { baseURL } from "../../baseURL";
import HospitalList from "./HospitalList";
import { Title } from "react-native-paper";
import Hospital from "./Hospital";

interface DoctorProps {
  _id: string;
  username: string;
  role: string;
  hospital: string;
}

interface HospitalProps {
  _id: string;
  username: string;
  doctors: DoctorProps[];
}

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
  const [hospitals, setHospitals] = useState<HospitalProps[]>([]);
  const [currentHospital, setCurrentHospital] = useState<HospitalProps>({
    _id: "",
    username: "",
    doctors: [],
  });
  const [currentDisplay, setCurrentDisplay] = useState<number>(0);

  const hospitalsRef = useRef(hospitals);
  const currentHospitalRef = useRef(currentHospital);
  hospitalsRef.current = [];
  currentHospitalRef.current;

  useEffect(() => {
    Axios({
      method: "GET",
      url: `${baseURL}/hospital/get-hospitals`,
    })
      .then((response) => {
        if (response.data && response.data.hospitals) {
          console.log(response.data.hospitals);
          setHospitals(response.data.hospitals);
          hospitalsRef.current = response.data.hospitals;
        }
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(`[Hospital] currentHospital: ${JSON.stringify(currentHospital)}`);

  const tokenElement = (
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

  return (
    <View>
      {currentDisplay === 0 ? (
        <HospitalList
          hospitals={hospitals}
          currentHospitalRef={currentHospitalRef}
          setCurrentDisplay={setCurrentDisplay}
          setCurrentHospital={setCurrentHospital}
        />
      ) : (
        <Hospital
          hospital={currentHospitalRef.current}
          setCurrentDisplay={setCurrentDisplay}
        />
      )}
    </View>
  );
};

export default Queue;
