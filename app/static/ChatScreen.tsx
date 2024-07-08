import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReduser';
import { addMessage, deleteMessage, selectMessagesByChatId, updateMessage } from '../redux/messageSlice';
import { selectChatById } from '../redux/chatSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Message } from '../core/models'

type RootStackParamList = {
  Home: undefined;
  Chat: { chatId: string };
  CreateChat: undefined;
};

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;
type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;

type Props = {
  route: ChatScreenRouteProp;
  navigation: ChatScreenNavigationProp;
};

const ChatScreen: React.FC<Props> = ({ route }) => {
  const { chatId } = route.params;
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => selectMessagesByChatId(state, chatId));
  const chat = useSelector((state: RootState) => selectChatById(state, chatId));
  const [newMessage, setNewMessage] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [editMessageText, setEditMessageText] = useState('');
  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);


  const currentUser = 'User';

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: new Date().toISOString(),
        text: newMessage,
        sender: currentUser, 
        createdAt: new Date().toISOString(),
        chatId: chatId,
      };
      dispatch(addMessage(message));
      setNewMessage('');
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    const messageToDelete = messages.find(message => message.id === messageId);
    if (messageToDelete && messageToDelete.sender === currentUser) {
      dispatch(deleteMessage(messageId));
      setSelectedMessage(null);
    } else {
      Alert.alert('You can only delete your own messages.');
    }
  };

  const handleEditMessage = (messageId: string) => {
    if (editMessageText.trim()) {
      const messageToUpdate = messages.find(message => message.id === messageId);
      if (messageToUpdate && messageToUpdate.sender === currentUser) {
        dispatch(updateMessage({ id: messageId, text: editMessageText }));
        setSelectedMessage(null);
        setEditMessageText('');
      } else {
        Alert.alert('You can only edit your own messages.');
      }
    } else {
      Alert.alert('Message text cannot be empty');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.chatName}>{chat?.name}</Text>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => {
              setSelectedMessage(item.id);
              setEditMessageText(item.text);
            }}
          >
            <View style={[styles.messageContainer, item.sender === currentUser ? styles.currentUserMessage : styles.otherUserMessage]}>
              <Text style={styles.messageSender}>{item.sender}</Text>
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={styles.messageDate}>{new Date(item.createdAt).toLocaleString()}</Text>
            </View>
          </TouchableOpacity>
        )}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendContainer}>
          <Icon name="send" size={34} color="gray" />
        </TouchableOpacity>
      </View>
      {selectedMessage && (
        <Modal
          transparent={true}
          visible={!!selectedMessage}
          onRequestClose={() => setSelectedMessage(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.modalInput}
                placeholder="Edit message"
                value={editMessageText}
                onChangeText={setEditMessageText}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => handleEditMessage(selectedMessage)} >
                  <Icon name="edit" size={24} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteMessage(selectedMessage)}>
                  <Icon name="delete" size={24} color="gray" />
                </TouchableOpacity>
                <Button title="Cancel" onPress={() => setSelectedMessage(null)} />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  chatName: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '70%',
  },
  currentUserMessage: {
    backgroundColor: '#d1fcd3',
    alignSelf: 'flex-end',
  },
  otherUserMessage: {
    backgroundColor: '#f1f1f1',
    alignSelf: 'flex-start',
  },
  messageSender: {
    fontWeight: 'bold',
  },
  messageText: {
    marginVertical: 5,
  },
  messageDate: {
    fontSize: 12,
    color: '#555',
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sendContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
});

export default ChatScreen;
