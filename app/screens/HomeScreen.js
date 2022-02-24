import React, { useState } from "react";
import { IconButton, Icon, View, Center, Button, useToast } from "native-base";
import {
  Entypo,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import ColorPalete from "../utils/ColorPalete";
import { useDispatch, useSelector } from "react-redux";
import { Logout, sendUserLocation } from "../store/actions/authAction";
import * as Location from "expo-location";

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(Logout(navigation));
  };
  const handleReport = () => {
    navigation.push("report");
  };
  const handleChat = () => {
    navigation.push("chat");
  };
  const handleFeed = () => {
    navigation.push("feed");
  };
  const handleStatus = () => {
    navigation.push("status");
  };
  console.log("user", user);
  const handleLocation = () => {
    Alert.alert(
      "Warning",
      "Are you sure? You want to send emergency request.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              setLoading(true);
              let { status } =
                await Location.requestForegroundPermissionsAsync();
              if (status) {
                const location = await Location.getCurrentPositionAsync({
                  timeout: 5000,
                });
                const { latitude, longitude } = location.coords;
                const userLocation = {
                  lat: latitude,
                  lng: longitude,
                };

                await dispatch(sendUserLocation(userLocation, toast));
                setLoading(false);
              }
            } catch (error) {
              Alert.alert("Could not fetch location", [{ text: "Okay" }]);
            }
          },
        },
      ]
    );

    setLoading(false);
  };
  return (
    <View style={styles.Container}>
      <Text style={styles.heroText}>Hello, {user?.name}!</Text>
      <View style={styles.Hero}>
        <View style={styles.circle}>
          <Center>
            <IconButton
              style={styles.herobtn}
              onPress={handleLocation}
              onLongPress={async () => {
                try {
                  setLoading(true);
                  let { status } =
                    await Location.requestForegroundPermissionsAsync();
                  if (status) {
                    const location = await Location.getCurrentPositionAsync({
                      timeout: 5000,
                    });
                    const { latitude, longitude } = location.coords;
                    const userLocation = {
                      lat: latitude,
                      lng: longitude,
                    };
                    console.log(userLocation);
                    await dispatch(sendUserLocation(userLocation, toast));
                    setLoading(false);
                  }
                } catch (error) {
                  Alert.alert("Could not fetch location", [{ text: "Okay" }]);
                }
              }}
              icon={
                <Icon
                  as={Entypo}
                  name="direction"
                  size={40}
                  style={{ color: ColorPalete.secondary }}
                />
              }
              borderRadius="full"
            />
          </Center>
        </View>
        <Text style={styles.heroText}>
          {!loading ? (
            "Send Location"
          ) : (
            <ActivityIndicator color={ColorPalete.secondary} />
          )}
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.cardList}>
          <Button style={styles.card} onPress={handleFeed}>
            <Icon
              as={FontAwesome5}
              name="rss-square"
              size={10}
              style={{ color: ColorPalete.primary }}
            />
            <Text style={styles.cardText}>Feed</Text>
          </Button>
          <Button style={styles.card} onPress={handleReport}>
            <Icon
              as={FontAwesome5}
              name="envelope-open"
              size={10}
              style={{ color: ColorPalete.primary }}
            />
            <Text style={styles.cardText}>Online FIR</Text>
          </Button>
          <Button style={styles.card} onPress={handleChat}>
            <Icon
              as={FontAwesome5}
              name="comment"
              size={10}
              style={{ color: ColorPalete.primary }}
            />
            <Text style={styles.cardText}>Chat</Text>
          </Button>
        </View>
        <View style={styles.cardList}>
          <Button style={styles.card} onPress={handleStatus}>
            <Icon
              as={MaterialCommunityIcons}
              name="file"
              size={10}
              style={{ color: ColorPalete.primary }}
            />
            <Text style={styles.cardText}>Status</Text>
          </Button>
          <Button style={styles.card} onPress={handleLogout}>
            <Icon
              as={MaterialIcons}
              name="logout"
              size={10}
              style={{ color: ColorPalete.primary }}
            />
            <Text style={styles.cardText}>Log Out</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: ColorPalete.primary,
    width: "100%",
    height: "100%",
    display: "flex",
    padding: 20,
  },
  Hero: {
    marginTop: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  heroText: {
    marginTop: 40,
    fontWeight: "600",
    fontSize: 20,
    color: ColorPalete.secondary,
  },
  herobtn: {
    backgroundColor: ColorPalete.btn,
  },
  circle: {
    marginTop: 20,
    borderColor: "blue",
    borderRadius: 120,
    height: 200,
    width: 200,
    backgroundColor: "white",
    justifyContent: "center",
  },
  cardContainer: {
    marginTop: 40,
    backgroundColor: ColorPalete.secondary,
    borderRadius: 8,
    padding: 20,
  },
  card: {
    backgroundColor: "transparent",
    width: 110,
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "400",
    color: ColorPalete.primary,
  },
  cardList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
