import TRoom from '../TRoom';
import TChat from './TChat';

export type TChatEntering = {
  roomId: TRoom['id'];
};

export type TChatSending = {
  content: string;
};

export type TChatReceive = TChat & {};

export type TChatLeaving = {
  roomId: TRoom['id'];
};
