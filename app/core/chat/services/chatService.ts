import { Chat } from '../../models';

const BASE_URL = 'https://api.example.com'; 

export const createChat = async (name: string, createdBy: string): Promise<Chat> => {
  const response = await fetch(`${BASE_URL}/chats`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, createdBy }),
  });

  if (!response.ok) {
    throw new Error('Failed to create chat');
  }

  return await response.json();
};

export const getChats = async (): Promise<Chat[]> => {
  const response = await fetch(`${BASE_URL}/chats`);

  if (!response.ok) {
    throw new Error('Failed to fetch chats');
  }

  return await response.json();
};

export const deleteChat = async (chatId: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/chats/${chatId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete chat');
  }
};
