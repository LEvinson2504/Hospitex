import React from "react";
import { Button } from "react-native-paper";
import Axios from "axios";
import { baseURL } from "../../baseURL";

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Logout: React.FC<Props> = ({ setIsLoggedIn }) => {
  return (
    <Button
      onPress={async () => {
        try {
          console.log(`[Auth] An user is trying to logout`);
          const response = await Axios({
            method: "GET",
            url: `${baseURL}/auth/logout`,
          });
          console.log(response.data);
          setIsLoggedIn(false);
        } catch (err) {
          console.log(err.message);
        }
      }}
    >
      Logout
    </Button>
  );
};

export default Logout;
