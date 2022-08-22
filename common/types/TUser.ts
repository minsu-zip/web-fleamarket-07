import TLocation from './TLocation';

type TUser = {
  id: number;
  name: string;
  location1Id: Pick<TLocation, 'id'>;
  location2Id?: Pick<TLocation, 'id'>;
};

export default TUser;
