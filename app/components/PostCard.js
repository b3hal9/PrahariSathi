import { Avatar, Image } from "native-base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ColorPalete from "../utils/ColorPalete";
import moment from "moment";

const PostCard = ({
  post: { author, title, description, image, createdAt },
}) => {
  let time = moment(createdAt).format("MM/DD/YYYY, hA");
  let pattern = /(\w)\w*\s*(\w)\w*/g;
  let result = pattern.exec(author?.name);
  const avatar = result[1] + result[2];
  return (
    <View style={styles.box}>
      <View style={styles.postTop}>
        <View style={styles.author}>
          <Avatar
            bg={ColorPalete.primary}
            // source={{
            //   uri: '',
            // }}
          >
            {avatar}
          </Avatar>
          <Text style={styles.authorName}>{author.name}</Text>
        </View>
        <Text style={styles.extra}>
          <FontAwesome name="clock-o" size={12} color="black" />
          {time}
        </Text>
      </View>
      <View style={styles.postBody}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View>
          {image && (
            <Image
              source={{
                uri: `http://192.168.254.2:5000/${image}`,
              }}
              alt="post-image"
              style={styles.postImage}
            />
          )}
        </View>
      </View>
      {/* <Text style={styles.extra}>
        <FontAwesome name="eye" size={12} color="black" />
        1200 views
      </Text> */}
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  postImage: {
    borderRadius: 8,
    marginTop: 5,
    width: "100%",
    height: 300,
  },
  author: {
    flexDirection: "row",
  },
  authorName: {
    marginLeft: 10,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 12,
  },
  extra: {
    opacity: 0.4,
    fontStyle: "italic",
    fontSize: 12,
    marginTop: 10,
  },
  box: {
    margin: 10,
    backgroundColor: ColorPalete.secondary,
    padding: 20,
    borderRadius: 16,
    marginBottom: 10,
  },
  postTop: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "justify",
  },
});
