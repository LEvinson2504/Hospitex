import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { UserContext } from "./contexts/UserContext";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // context api for user
  const [user, setUser] = useState({
    id: "",
    username: "",
    role: "",
  });
  const values = {
    ...user,
    setUser,
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <UserContext.Provider value={values}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </UserContext.Provider>
      </SafeAreaProvider>
    );
  }
}
