type TUserGithub = {
  id: number;
  name: string;
  avatar: string;
  location1: {
    id: number;
    region: string;
  };
  location2?: {
    id: number;
    region: string;
  };
};

export default TUserGithub;
