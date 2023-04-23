import React, { Component, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from '../env';
import { Ionicons } from '@expo/vector-icons';
import { Avatar} from '@rneui/base';
import { auth ,db} from '../firebase';
const BOT = {
  _id: 2,
  name: 'Max',
  avatar: 'https://placeimg.com/140/140/any',
};

const USER = {
  _id: 1,
  name: 'Abhinand',
  avatar: 'https://placeimg.com/140/140/any',
}
class Chat extends Component {
  
  userEmail = ""
  state = {
    messages: [
      {
        _id: 2,
        text: 'My name is Maxx Bot',
        createdAt: new Date().getTime(),
        user: BOT,
      },
    ],
    id: 1,
    name: '',
  };
  // componentDidMount() {
  // const userD = this.props.route.params.userD
  // console.log(userD)_

  // }
  componentDidMount() {
    
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id,
    );
      console.log("COMP MOUNT")
    const userD = this.props.route.params.userD;
    const all_messages = db.collection('CHATBOT_HISTORY');
    all_messages.where('email', '==', userD.email).orderBy('time','asc').get().then((snapshot) => {
      console.log(snapshot.empty,'empty')
      messages_array = []
      snapshot.forEach(doc => {
        data = doc.data()
        message = data.text
        
        time = data.time
        if (data.userType == "bot"){
        let msg = {
          _id: this.state.messages.length + 1,
          text: message,
          createdAt: time,
          user: BOT,
          key: Math.round(Math.random() * 1000000),
          received: true
        };
        this.setState((previousState) => ({
              messages: GiftedChat.append(previousState.messages, [msg]),
            }));
      }
      else {
        let msg = {
          _id: this.state.messages.length + 1,
          text: message,
          createdAt: time,
          user: USER,
          key: Math.round(Math.random() * 1000000),
          received: true,
        };
        this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));

      }
      });
    });
    

    this.userEmail = userD.email

  }

   
  handleGoogleResponse(result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    this.sendBotResponse(text);
  }

  async sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT,
    };
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
    await db.collection('CHATBOT_HISTORY').add({
      email: this.userEmail,
      text: text,
      userType:'bot',
      time: new Date().getTime()
    });

  }

  onSend(messages = [], insert=true) {
    console.log("Message", messages)
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    let message = messages[0].text;
    if (insert !== false) {
      console.log("inserting")
    db.collection('CHATBOT_HISTORY').add({
      email: this.userEmail,
      text: message,
      userType:'student',
      time: new Date().getTime()
    })
  }
  console.log(insert, "INSERT?")
  if (insert !== false)
  {
    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error),
    );
  }
  }

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{ right: { color: 'white' } }}
        wrapperStyle={{ left: { backgroundColor: '#F1F0F0' } }}
      />
    );
  };

  renderSend = (props) => {
    return (
      <TouchableOpacity
        style={{ marginRight: 10, marginBottom: 5 }}
        onPress={() => {
          props.onSend({ text: props.text.trim() }, true);
        }}>
         
        <Ionicons name="send" size={24} color="#035efc" />
      </TouchableOpacity>
    );
  };
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          _id: 29544515,
          text: 'My name is Maxx Bot',
          createdAt: new Date().getTime(),
          user: BOT,
          received: true
        },
      ],
      id: 1,
      name: '',
    };
  }
  //  componentDidMount() {
  //   const { userD } = this.props.route.params;
  //   db.collection("CHATBOT_HISTORY")
  //     .where("email", "==", userD.email)
  //     .orderBy("time")
  //     .get()
  //     .then((querySnapshot) => {
  //       const fetchedData = [];
  //       querySnapshot.forEach((doc) => {
  //         fetchedData.push(doc.data());
  //       });
  //       this.setState({ data: fetchedData });
  //     })
  //     .catch((error) => {
  //       console.log("Error getting documents: ", error);
  //     });
  // }
  render() {
    return (
      <View style={{ flex: 1 ,Bottom:10,overflow:'hidden',}}>
      <View style={{shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',backgroundColor:'#fffff',marginTop:30,}}>
         <TouchableOpacity >
         <Text style={{textAlign:'center',fontSize:20,marginLeft:160}}>Maxx bot</Text>
         </TouchableOpacity>
         <Avatar
      rounded
      icon={{
        name: 'person-outline',
        type: 'material',
        size: 26,
      }}
      containerStyle={{ backgroundColor: '#c2c2c2',marginRight:30 }}
    />
         </View>
         <Text style={{textAlign:'center',fontWeight:'200',fontSize:15}}>Online</Text>

      </View>
        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages, insert=true)}
          renderBubble={this.renderBubble}
          renderSend={this.renderSend}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }
}

export default Chat;
