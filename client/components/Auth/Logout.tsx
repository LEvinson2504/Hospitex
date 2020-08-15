import React, { useContext } from "react";
import { Button } from "react-native-paper";
import Axios from "axios";
import { baseURL } from "../../baseURL";
import { UserContext } from "../../contexts/UserContext";
import { roles } from "../../constants/Roles";

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Logout: React.FC<Props> = ({ setIsLoggedIn }) => {
  const { role } = useContext(UserContext);
  return (
    <Button
      onPress={async () => {
        try {
          console.log(`[Auth] An user is trying to logout`);
          const response = await Axios({
            method: "GET",
            url: `${baseURL}/auth/${
              role === roles.hospital ? roles.hospital : "user"
            }/logout`,
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
