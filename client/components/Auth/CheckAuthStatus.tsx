import React from "react";
import { View } from "../UI/Themed";
import Axios from "axios";
import { baseURL } from "../../baseURL";

interface Props {
  setUser: React.Dispatch<
    React.SetStateAction<{ id: string; username: string; role: string }>
  >;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const checkMe = async () => {
  const response = await Axios({
    method: "GET",
    url: `${baseURL}/auth/me`,
  });
  return response.data;
};

export const CheckAuthStatus = ({ setUser, setIsLoggedIn }: Props) => {
  checkMe().then((response) => {
    if (response.user) {
      setUser({
        id: response.user._id,
        username: response.user.username,
        role: response.user.role,
      });

      setIsLoggedIn(true);
    }
  });
};
