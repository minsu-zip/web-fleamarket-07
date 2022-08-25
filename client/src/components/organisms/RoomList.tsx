import RoomItem from '@components/molecules/RoomItem';
import styled from '@emotion/styled';
import useRoom from '@hooks/useRoom';
import Socket from '@src/sockets';
import { useLayoutEffect } from 'react';

const RoomList = () => {
  const { rooms } = useRoom();

  useLayoutEffect(() => {
    Socket.connect();

    return () => {
      Socket.disconnect();
    };
  }, []);

  console.log(rooms);

  return (
    <ContainerDiv>
      {Object.values(rooms).map((roomInfo) => (
        // <RoomItem key={roomInfo.id} roomInfo={roomInfo}></RoomItem>
        <div>{roomInfo.id}</div>
      ))}
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  margin-top: 12px;
`;

export default RoomList;
