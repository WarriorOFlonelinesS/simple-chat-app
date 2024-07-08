import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReduser';

interface Chat {
  id: string;
  name: string;
  createdBy: string;
}

interface ChatsState {
  chats: Chat[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatsState = {
  chats: [],
  loading: false,
  error: null,
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    fetchChatsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchChatsSuccess(state, action: PayloadAction<Chat[]>) {
      state.chats = action.payload;
      state.loading = false;
    },
    fetchChatsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    addChat(state, action: PayloadAction<Chat>) {
      state.chats.push(action.payload);
    },
    deleteChat(state, action: PayloadAction<string>) {
      state.chats = state.chats.filter((chat) => chat.id !== action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  fetchChatsStart,
  fetchChatsSuccess,
  fetchChatsFailure,
  addChat,
  deleteChat,
  setLoading,
} = chatsSlice.actions;

export const selectChats = (state: RootState) => state.chats.chats;
export const selectLoading = (state: RootState) => state.chats.loading;
export const selectError = (state: RootState) => state.chats.error;

export const selectChatById = (state: RootState, chatId: string) =>
  state.chats.chats.find((chat) => chat.id === chatId);

export default chatsSlice.reducer;
