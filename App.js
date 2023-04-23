import React, { useState ,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { firebase,auth } from './firebase'; // note the use of destructuring here
import Login from './components/Login';
import Chat from './components/Chat';
import SignUp from './components/SignUp';
import Admin from './components/Admin';
import Profile from './components/Profile';
import StudentDetails from './components/StudentDetails';
import StudentList from './components/StudentList';
import StudentChat from './components/StudentChat';
// import Welcome from './components/Welcome';
const Stack = createNativeStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber =auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
      {/* <Stack.screen name="Welcome" component={Welcome}/> */}
        
        {!user ? (
          <>
              <Stack.Screen name="Login" component={Login} options={{title:"Maxx bot", headerTitleStyle: {
                textAlign:'center',
            fontWeight: 'bold',
            fontSize: 25,
            
          },
          headerTitleAlign: 'center',}}/>
            <Stack.Screen name="SignUp"component={SignUp} options={{title:"Maxx bot", headerTitleStyle: {
                textAlign:'center',
            fontWeight: '100',
            fontSize: 25,
            
          },
          headerTitleAlign: 'center',}}  />
          </>
        ) : (
          <>
          
          <Stack.Screen name="Chat" component={Chat}  options={{headerShown: false}} />
          <Stack.Screen name="Admin" component={Admin} />
            <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
            <Stack.Screen name="StudentDetails" component={StudentDetails}/>
            <Stack.Screen name="StudentList" component={StudentList}/>
            <Stack.Screen name="StudentChat" component={StudentChat}/>
            <Stack.Screen name="Login" component={Login}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
