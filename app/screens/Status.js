import { View, ScrollView, useToast, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { handle_getAllUserReport } from "../store/actions/postActions";
import ColorPalete from "../utils/ColorPalete";
import moment from "moment";

const StatusScreen = () => {
  const [reports, setReports] = useState([]);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(handle_getAllUserReport(toast, setReports));
  }, [dispatch]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {reports.length > 0 ? (
            <View style={styles.Card}>
              {reports.map((report) => (
                <View key={report._id}>
                  <Text style={styles.text}>Report Id: {report._id}</Text>
                  <Text style={styles.text}>Status: {report.status}</Text>
                  <Text style={styles.text}>
                    Time: {moment(report.updatedAt).format("MM/DD/YYYY, hA")}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <>
              <Text style={styles.text}>Loading Reports.</Text>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StatusScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 20,
  },
  Card: {
    display: "flex",
    padding: 20,
    backgroundColor: ColorPalete.primary,
    borderRadius: 16,
    color: ColorPalete.secondary,
  },
  text: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },
});
