import { db } from "../firebase";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";

const StudentChat = ({ navigation, route }) => {
  const { userD } = route.params;
  const [data, setData] = useState([]);
  useEffect(() => {
    db.collection("CHATBOT_HISTORY")
      .where("email", "==", userD.email)
      .orderBy("time")
      .get()
      .then((querySnapshot) => {
        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push(doc.data());
        });
        setData(fetchedData);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  const renderItem = ({ item }) => {
    const isStudent = item.userType === "student";
    const bubbleStyle = {
      backgroundColor: isStudent ? "#3d65f9" : "#f9a33d",
      width: "70%",
      padding: 10,
      alignSelf: isStudent ? "flex-end" : "flex-start",
      marginBottom: 10,
      marginTop: 10,
      marginRight: isStudent ? 10 : 0,
      marginLeft: isStudent ? 0 : 10,
      borderRadius: 10,
    };

    const textStyle = {
      color: "white",
    };

    const timestampStyle = {
      color: "gray",
    };

    return (
      <View style={bubbleStyle}>
        <Text style={textStyle}>{item.text}</Text>
        <Text style={timestampStyle}>
          {new Date(item.time).toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
         
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default StudentChat;
