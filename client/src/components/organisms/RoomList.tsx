import React from 'react';
import RoomItem from '@components/molecules/RoomItem';
import styled from '@emotion/styled';
import useRoom from '@hooks/useRoom';
import Guide from '@components/atoms/Guide';

const RoomList: React.FC = () => {
  const { rooms, error } = useRoom();

  if (error) {
    return (
      <ContainerDiv>
        <Guide.Error message={error} />
      </ContainerDiv>
    );
  }

  if (Object.keys(rooms).length === 0) {
    return (
      <ContainerDiv>
        <Guide.Loading />
      </ContainerDiv>
    );
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
  margin-top: 0.75rem;
  flex: 1;
`;

export default RoomList;
