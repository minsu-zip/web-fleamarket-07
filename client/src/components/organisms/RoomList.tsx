import RoomItem from '@components/molecules/RoomItem';
import styled from '@emotion/styled';

const roomList = [
  {
    id: 1,
    product_id: 1,
    seller_id: 2,
    buyer_id: 1,
    chatCount: 5,
    buyer_name: 'UserC',
    content: '혹시 팔렸나요?',
    createdAt: '2022-08-24 06:20:11.525837',
  },
  {
    id: 2,
    product_id: 1,
    seller_id: 2,
    buyer_id: 1,
    chatCount: 5,
    buyer_name: 'UserC',
    content:
      '실제로 신어볼 수 있는건가요??실제로 신어볼 수 있는건가요??실제로 신어볼 수 있는건가요??',
    createdAt: '2022-08-25 12:20:11.525837',
  },
  {
    id: 3,
    product_id: 1,
    seller_id: 2,
    buyer_id: 1,
    chatCount: 5,
    buyer_name: 'UserC',
    content: '혹시 팔렸나요?',
    createdAt: '2022-08-24 06:20:11.525837',
  },
];

const RoomList = () => {
  return (
    <ContainerDiv>
      {roomList.map((roomInfo) => (
        <RoomItem key={roomInfo.id} roomInfo={roomInfo}></RoomItem>
      ))}
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  margin-top: 12px;
`;

export default RoomList;
