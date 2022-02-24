import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
//Auth screens
import LoginScreen from "../../screens/Auth/LoginScreen";
import SignupScreen from "../../screens/Auth/SignupScreen";
import ResetScreen from "../../screens/Auth/ResetPassword";
import KycScreen from "../../screens/Auth/KycScreen";
import LandingPage from "../../screens/LandingPage";
import HomeScreen from "../../screens/HomeScreen";
import PostScreen from "../../screens/PostScreen";
import ChatScreen from "../../screens/ChatScreen";
import ReportForm from "../../screens/ReportScreen";
import StatusScreen from "../../screens/Status";

const Stack = createStackNavigator();

const AuthNavigation = () => (
  <Stack.Navigator headerMode="none" initialRouteName="welcome">
    <Stack.Screen name="welcome" component={LandingPage} />
    <Stack.Screen name="login" component={LoginScreen} />
    <Stack.Screen name="register" component={SignupScreen} />
    <Stack.Screen name="resetForm" component={ResetScreen} />
    <Stack.Screen name="kyc" component={KycScreen} />
    <Stack.Screen name="home" component={HomeScreen} />
    <Stack.Screen name="feed" component={PostScreen} />
    <Stack.Screen name="chat" component={ChatScreen} />
    <Stack.Screen name="report" component={ReportForm} />
    <Stack.Screen name="status" component={StatusScreen} />
  </Stack.Navigator>
);

export default AuthNavigation;
