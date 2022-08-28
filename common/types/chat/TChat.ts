import TRoom from '../room/TRoom';
import type { TUser } from '../user';

type TChat = {
  id: number;
  content: string;
  roomId: TRoom['id'];
  userId: TUser['id'];
  createdAt?: Date;
};

export default TChat;
