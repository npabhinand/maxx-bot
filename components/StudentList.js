import { auth, db } from '../firebase';
import { View,  TouchableOpacity, FlatList,} from 'react-native';
import { ListItem, Avatar } from '@rneui/themed';
import React, { useState,useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const StudentList = () => {
  const navigation=useNavigation()
    const [data, setData] = useState([]);
    useEffect(() => {
      
      db.collection("users").where("userType", "==", "student")
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              // console.log(doc.id, " => ", doc.data());
              const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              setData(data);
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    }, []);
      
  return (
    <View >
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={()=>navigation.navigate("StudentChat",{userD:item})}>
          <ListItem key={item.id} bottomDivider>
            <TouchableOpacity onPress={() => navigation.navigate("StudentDetails",{userD:item})}>
            <Avatar
      rounded
      icon={{
        name: 'person-outline',
        type: 'material',
        size: 26,
      }}
      containerStyle={{ backgroundColor: '#c2c2c2',marginRight:30 }}
    />
            </TouchableOpacity>
           
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
          </ListItem>
          </TouchableOpacity>
        )}
      />
      </View>
  )
}

export default StudentList