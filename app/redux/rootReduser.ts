import { combineReducers } from 'redux';
import messagesReducer from './messageSlice';
import chatsReducer from './chatSlice';

const rootReducer = combineReducers({
  messages: messagesReducer,
  chats: chatsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
