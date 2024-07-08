import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReduser';

interface Message {
  id: string;
  text: string;
  sender: string;
  chatId: string;
  createdAt: string;
}

export interface MessagesState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

export const initialState: MessagesState = {
  messages: [
    {
      id: '1',
      text: 'Hello from user A',
      sender: 'userA',
      chatId: '10',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      text: 'Hello from user B',
      sender: 'userB',
      chatId: '10',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      text: 'Another message from user A',
      sender: 'userA',
      chatId: '15',
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      text: 'Another message from user B',
      sender: 'userB',
      chatId: '15',
      createdAt: new Date().toISOString(),
    },
  ],
  loading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    fetchMessagesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMessagesSuccess(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
      state.loading = false;
    },
    fetchMessagesFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    deleteMessage(state, action: PayloadAction<string>) {
      state.messages = state.messages.filter((message) => message.id !== action.payload);
    },
    updateMessage(state, action: PayloadAction<{ id: string; text: string }>) {
      const messageIndex = state.messages.findIndex((message) => message.id === action.payload.id);
      if (messageIndex !== -1) {
        state.messages[messageIndex].text = action.payload.text;
      }
    },
  },
});

export const {
  fetchMessagesStart,
  fetchMessagesSuccess,
  fetchMessagesFailure,
  addMessage,
  deleteMessage,
  updateMessage,
} = messagesSlice.actions;

export const selectMessages = (state: RootState) => state.messages.messages;
export const selectMessagesByChatId = (state: RootState, chatId: string) =>
  state.messages.messages.filter((message) => message.chatId === chatId);
export const selectMessagesLoading = (state: RootState) => state.messages.loading;
export const selectMessagesError = (state: RootState) => state.messages.error;

export default messagesSlice.reducer;
