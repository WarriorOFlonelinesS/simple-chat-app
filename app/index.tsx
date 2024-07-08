import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import  store  from './redux/store'; 
import HomeScreen from './static/ChatListScreen';
import ChatScreen from './static/ChatScreen'; 
import CreateChatScreen from './static/CreateChatScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="CreateChat" component={CreateChatScreen} />
        </Stack.Navigator>
    </Provider>
  );
};

export default App;
