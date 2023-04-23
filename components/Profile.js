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
import { useNavigation } from "@react-navigation/native";

export default function Profile(props) {
  const navigation = useNavigation();
  const userD = props.userD;
  const signOut = () => { 
  
    console.log("Signout called")
   auth.signOut().then(()=>navigation.navigate("Login")).catch((err)=>console.log(err)) }
  
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
 <Image source={require('./assets/phone.png')} style={{width:20,height:20}}/>
 <Text>{userD.phone}</Text>
 
</View>

<TouchableOpacity style={{alignSelf:'center',
flexDirection:'row',justifyContent:'center',backgroundColor:'#fff',width:'90%',
padding:20,paddingBottom:22,borderRadius:10,shadowOpacity:80,elevation:15,marginTop:20,backgroundColor:'#000'}} onPress={signOut}>
 <Image source={require('./assets/phone.png')} style={{width:20,height:20}}/>
 <Text style={{color:"#FFFFFF"}}>Logout</Text></TouchableOpacity>

</ScrollView></View>
)}