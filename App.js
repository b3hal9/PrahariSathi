import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import AuthNavigation from "./app/components/navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./app/store/store";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreLogs(["NativeBase:"]);
  // Define the config
  const config = {
    useSystemColorMode: true,
    // initialColorMode: 'dark',
  };

  // extend the theme
  const customTheme = extendTheme({ config });

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <AuthNavigation />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
