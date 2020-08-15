import React, { createContext } from "react";

type Props = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const isLoggedInContext = createContext<Props>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});
