import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,TouchableOpacity
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Card,Avatar } from "@rneui/base";
import { auth } from "../firebase";
export default function StudentDetails({route,navigation}) {
  const {userD }=route.params;
  
  // console.log(userD);
  
  
  return (
    <View>
<ScrollView showsVerticalScrollIndicator={false}>
<View style={{padiing:10,width:'100%',backgroundColor:'#000',height:150}}>
  <TouchableOpacity>
    <Avatar source={require('./assets/back.png')}/>
    <View></View>
    <View></View>
  </TouchableOpacity>
  
</View>
<View style={{alignItems:'center'}}>
  <Image source={require('./assets/profile.jpg')} style={{width:140,height:140,borderRadius:100,marginTop:-70}}/>
  <Text style={{fontSize:25,fontWeight:'bold',padding:10}}>{userD.name}</Text>
</View>


<View style={{alignSelf:'center',
flexDirection:'row',justifyContent:'center',backgroundColor:'#fff',width:'90%',
padding:20,paddingBottom:22,borderRadius:10,shadowOpacity:80,elevation:15,marginTop:20}}>
  <Image source={require('./assets/email.png')} style={{width:20,height:20}}/>
  <Text>{userD.email}</Text>
  </View>
  <View style={{alignSelf:'center',
flexDirection:'row',justifyContent:'center',backgroundColor:'#fff',width:'90%',
padding:20,paddingBottom:22,borderRadius:10,shadowOpacity:80,elevation:15,marginTop:20}}>
 <Image source={require('./assets/user.png')} style={{width:20,height:20}}/>
 <Text>{userD.userType}</Text>
 
</View>
  <View style={{alignSelf:'center',
flexDirection:'row',justifyContent:'center',backgroundColor:'#fff',width:'90%',
padding:20,paddingBottom:22,borderRadius:10,shadowOpacity:80,elevation:15,marginTop:20}}>
 <Image source={require('./assets/phone.png')} style={{width:20,height:20}}/>
 <Text>{userD.phone}</Text>
 
</View>

</ScrollView></View>
)}