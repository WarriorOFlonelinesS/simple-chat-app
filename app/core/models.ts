export interface Chat {
  id: string;
  name: string;
  createdBy: string;
}

export interface Message {
  id: string;
  text: string;
  sender: string;
  chatId: string;
  createdAt: string;
}
