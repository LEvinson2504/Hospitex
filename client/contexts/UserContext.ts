import { createContext, Dispatch, SetStateAction } from "react";

type Props = {
  id: string;
  email: string;
  role: string;
  setUser: Dispatch<
    SetStateAction<{
      id: string;
      email: string;
      role: string;
    }>
  >;
};

export const UserContext = createContext<Props>({
  id: "",
  email: "",
  role: "",
  setUser: () => {},
});
