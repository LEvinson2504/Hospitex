import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { UserContext } from "./contexts/UserContext";
import Auth from "./components/Auth/Auth";
import { CheckAuthStatus } from "./components/Auth/CheckAuthStatus";
import { isLoggedInContext } from "./contexts/isLoggedInContext";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // context api for user
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [user, setUser] = useState({
    id: "",
    email: "",
    role: "",
  });
  const userValues = {
    ...user,
    setUser,
  };

  const isLoggedInValues = {
    isLoggedIn,
    setIsLoggedIn,
  };

  useEffect(() => {
    CheckAuthStatus({ setUser, setIsLoggedIn });
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    console.log(`[Auth] isLoggedIn: ${isLoggedIn}`);

    return (
      <SafeAreaProvider>
        <isLoggedInContext.Provider value={isLoggedInValues}>
          <UserContext.Provider value={userValues}>
            {isLoggedIn ? (
              <>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </>
            ) : (
              <Auth setIsLoggedIn={setIsLoggedIn} />
            )}
          </UserContext.Provider>
        </isLoggedInContext.Provider>
      </SafeAreaProvider>
    );
  }
}
