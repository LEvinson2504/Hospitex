import { receiveQueue } from "./socketUtils";
import Axios from "axios";
import { baseURL } from "../../baseURL";
import { UserProps } from "../types";

interface Props {
  hospitalId: string;
  socket: SocketIOClient.Socket;
  setHospitalQueues: React.Dispatch<React.SetStateAction<UserProps[]>>;
}

export const ReceiveQueue = ({
  hospitalId,
  socket,
  setHospitalQueues,
}: Props) => {
  socket.on(`${hospitalId}-${receiveQueue}`, async (queues: string[]) => {
    const newQueue: UserProps[] = [];
    for await (let queue of queues) {
      const response = await Axios({
        method: "GET",
        url: `${baseURL}/auth/user/${queue}`,
      });
      console.log(response.data);
      newQueue.push(response.data.user);
    }
    setHospitalQueues(newQueue);
  });
};
