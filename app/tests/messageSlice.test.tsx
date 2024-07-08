import {
  addMessage,
  deleteMessage,
  updateMessage,
  selectMessages,
  selectMessagesByChatId,
  selectMessagesLoading,
  selectMessagesError,
} from '../redux/messageSlice';
import messagesReducer, { initialState } from '../redux/messageSlice';

describe('messages slice', () => {
  const messageA = {
    id: '5',
    text: 'New message',
    sender: 'userA',
    chatId: '10',
    createdAt: new Date().toISOString(),
  };

  const messageB = {
    id: '6',
    text: 'Another new message',
    sender: 'userB',
    chatId: '15',
    createdAt: new Date().toISOString(),
  };

  it('should handle adding a message', () => {
    const newState = messagesReducer(initialState, addMessage(messageA));
    expect(newState.messages).toHaveLength(initialState.messages.length + 1);
    expect(newState.messages.some((msg) => msg.id === messageA.id)).toBe(true);
  });

  it('should handle deleting a message', () => {
    const newState = messagesReducer(
      { ...initialState, messages: [...initialState.messages, messageA] },
      deleteMessage(messageA.id)
    );
    expect(newState.messages).toHaveLength(initialState.messages.length);
    expect(newState.messages.some((msg) => msg.id === messageA.id)).toBe(false);
  });

  it('should handle updating a message', () => {
    const updatedText = 'Updated text';
    const newState = messagesReducer(
      { ...initialState, messages: [...initialState.messages, messageA] },
      updateMessage({ id: messageA.id, text: updatedText })
    );
    const updatedMessage = newState.messages.find((msg) => msg.id === messageA.id);
    expect(updatedMessage?.text).toEqual(updatedText);
  });

  it('should select all messages', () => {
    const selectedMessages = selectMessages({ messages: initialState });
    expect(selectedMessages).toEqual(initialState.messages);
  });

  it('should select messages by chatId', () => {
    const chatId = '10';
    const selectedMessages = selectMessagesByChatId({ messages: initialState }, chatId);
    const expectedMessages = initialState.messages.filter((msg) => msg.chatId === chatId);
    expect(selectedMessages).toEqual(expectedMessages);
  });

  it('should select loading state', () => {
    const loading = selectMessagesLoading({ messages: initialState });
    expect(loading).toEqual(initialState.loading);
  });

  it('should select error state', () => {
    const error = selectMessagesError({ messages: initialState });
    expect(error).toEqual(initialState.error);
  });
});
