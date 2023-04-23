import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,ToastAndroid ,Image, ScrollView } from 'react-native';
import { auth, firestore } from '../firebase';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  const handleSignUp = async () => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      // Save user details to Firestore
      await firestore.collection('users').doc(user.uid).set({
        name: name,
        email: email,
        phone: phone,
        userType:'student'
      });

      // Navigate to home screen
      navigation.navigate('Chat');
    } catch (error) {
      console.log(error);
    }
  };
  
   
  return (
    
    <View style={styles.container}>
    <ScrollView>
    <View >
    <Image source={require('./assets/bot.gif')} style={styles.image}/>
    <Text style={styles.head}>Sign Up</Text>
    
     
    </View>
    <View containerStyle={styles.signup}>
    <View style={styles.inputView}>
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      </View>
      <View style={styles.inputView}>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />
      </View>
      <View style={styles.inputView}>
      <TextInput
        style={styles.input}
        placeholder="Enter phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      /></View>
 <View style={styles.inputView}>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      /></View>
       <View style={styles.inputView}>
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={{flexDirection:'row',alignContent:'center'}}>
        <Text style={{  marginTop:10,marginLeft:100 }} >
          Already an user?
        </Text>
        <Text style={styles.text} onPress={()=>navigation.navigate("Login")}> Login</Text>
       
      </View>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height:'100%',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: "#FFFFFF",
    // justifyContent: "center",
    alignItems: "center",
  },
  head:{ 
    textAlign:'center',
    fontSize:25,
    padding: 10,
    fontSize:25
  },
  input: {
    width: '95%',
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    marginBottom:-10,
    borderColor:'#16C72E',
    alignSelf:'center'
  },inputView:{
    position:'relative',
    marginTop:20,
}, image:{
  width:350,
  height:200
},
  button: {
    backgroundColor: "#038E47",
    padding: 5,
    marginTop: 30,
    width: 350,
    height: 50,
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    marginBottom:10,
    borderRadius:30
  },
  buttonText: {
    color: "white",
    // width: 200,
    height: 20,
    fontSize: 15,
    fontWeight:'500',
    textAlign: "center",
  },
  signup:{
    position:'absolute',
   backgroundColor:'#E4E4E4',
   width:'100%',
   marginTop:200,
   alignItems:'center',
   borderTopLeftRadius:40,
   borderTopRightRadius:40,
   marginTop:50
   
  },text:{
    textAlign:'right',
    marginBottom:5,
    color:'#16C72E',
    marginTop:10,marginRight:50
  },
});
export default SignUp;