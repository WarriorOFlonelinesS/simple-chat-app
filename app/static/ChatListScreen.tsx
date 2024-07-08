import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChatsStart, deleteChat, selectChats, selectLoading, selectError, setLoading } from '../redux/chatSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type RootStackParamList = {
  Home: undefined;
  Chat: { chatId: string };
  CreateChat: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const ChatListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const chats = useSelector(selectChats);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChats, setFilteredChats] = useState(chats);

  useEffect(() => {
    dispatch(fetchChatsStart());

    const timer = setTimeout(() => {
      dispatch(setLoading(false)); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, [dispatch]);

  useEffect(() => {
    setFilteredChats(
      chats.filter(chat => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, chats]);

  const handleDeleteChat = (chatId: string) => {
    dispatch(deleteChat(chatId));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.indicator}/>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (chats.length === 0) {
    return (
      <View style={styles.atentionContainer}>
        <Text style={styles.title}>No chats available. Create a new chat!</Text>
        <Button title="Create Chat" onPress={() => navigation.navigate('CreateChat')} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Chats"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Chat', { chatId: item.id })}>
            <View style={styles.chatContainer}>
              <Text style={styles.chatName}>{item.name}</Text>
              <TouchableOpacity onPress={() => handleDeleteChat(item.id)}>
                <Icon name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateChat')}>
        <Icon name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  atentionContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  indicator:{
    margin: 'auto'
  },
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  searchInput: {
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    margin: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  chatContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  chatName: {
    fontSize: 18,
    color: '#000',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#1e90ff',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 15,
    width: 193,
  }
});

export default ChatListScreen;
