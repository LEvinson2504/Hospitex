import { createContext, Dispatch, SetStateAction } from "react";

type Props = {
  id: string;
  username: string;
  role: string;
  setUser: Dispatch<
    SetStateAction<{
      id: string;
      username: string;
      role: string;
    }>
  >;
};

export const UserContext = createContext<Props>({
  id: "",
  username: "",
  role: "",
  setUser: () => {},
});
