import TRoom from '../TRoom';
import TChat from './TChat';

export type TChatConnect = {
  roomId: TRoom['id'];
  authToken: string;
};

export type TChatEntered = {
  chats: TChat[];
};

export type TChatSending = {
  content: string;
};

export type TChatReceive = TChat & {};

export type TChatLeaving = {
  roomId: TRoom['id'];
};
