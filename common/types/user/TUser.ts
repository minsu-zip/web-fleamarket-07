import TLocation from '../TLocation';

type TUser = {
  id: number;
  name: string;
  avatar: string;
  location1Id: TLocation['id'];
  location2Id?: TLocation['id'];
};

export default TUser;
