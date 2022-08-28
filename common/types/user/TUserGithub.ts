import { TLocation } from 'types/location';
import TUser from './TUser';

type TUserGithub = Pick<TUser, 'id' | 'name' | 'avatar'> & {
  location1: TLocation;
  location2?: TLocation;
};

export default TUserGithub;
