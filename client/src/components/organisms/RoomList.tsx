import React from 'react';
import RoomItem from '@components/molecules/RoomItem';
import styled from '@emotion/styled';
import useRoom from '@hooks/useRoom';

const RoomList: React.FC = () => {
  const { rooms } = useRoom();

  return (
    <ContainerDiv>
      {Object.values(rooms).map((roomInfo) => (
        <RoomItem key={roomInfo.id} roomInfo={roomInfo}></RoomItem>
      ))}
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  margin-top: 12px;
`;

export default RoomList;
