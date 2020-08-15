import io from "socket.io-client";
import { baseURL } from "../../baseURL";

export const InitSocket = () => {
  const socket = io(baseURL);
  socket.on("connection", () => {
    console.log(`[Queue] Initializing Queue`);
  });

  return socket;
};
