import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { addChat } from '../redux/chatSlice';
import { Chat } from '../core/models';

const CreateChatScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [chatName, setChatName] = useState('');

  const handleCreateChat = () => {
    if (chatName.trim() === '') {
      Alert.alert('Chat name cannot be empty');
      return;
    }

    const newChat: Chat = {
      id: String(10 + (Math.floor(Math.random() * 10))), 
      name: chatName,
      createdBy: 'currentUserId',
    };

    dispatch(addChat(newChat));
    setChatName('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter chat name"
        value={chatName}
        onChangeText={setChatName}
      />
      <TouchableOpacity style={styles.createButton} onPress={handleCreateChat}>
        <Text style={styles.buttonText}>Create Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  textInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  createButton: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CreateChatScreen;
