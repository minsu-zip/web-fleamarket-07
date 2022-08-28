import React from 'react';
import styled from '@emotion/styled';
import RoomItem from '@components/molecules/RoomItem';
import Guide from '@components/atoms/Guide';
import useRoom from '@hooks/useRoom';

const RoomList: React.FC = () => {
  const { rooms, error } = useRoom();

  if (error) {
    return <Guide.Error message={error} />;
  }

  if (Object.keys(rooms).length === 0) {
    return <Guide.Loading />;
  }

  return (
    <ContainerDiv>
      {Object.values(rooms).map((roomInfo) => (
        <RoomItem key={roomInfo.id} roomInfo={roomInfo}></RoomItem>
      ))}
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  flex: 1;
`;

export default RoomList;
