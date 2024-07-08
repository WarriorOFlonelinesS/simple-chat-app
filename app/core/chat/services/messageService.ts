import { Message } from '../../models';

const BASE_URL = 'https://api.example.com';

export const createMessage = async (text: string, sender: string, chatId: string): Promise<Message> => {
  const response = await fetch(`${BASE_URL}/chats/${chatId}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, sender }),
  });

  if (!response.ok) {
    throw new Error('Failed to create message');
  }

  return await response.json();
};

export const getMessages = async (chatId: string): Promise<Message[]> => {
  const response = await fetch(`${BASE_URL}/chats/${chatId}/messages`);

  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }

  return await response.json();
};
