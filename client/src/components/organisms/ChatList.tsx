import ChatItem from '@components/molecules/ChatItem';
import styled from '@emotion/styled';

const chatList = [
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

const ChatList = () => {
  return (
    <ContainerDiv>
      {chatList.map((chatInfo) => (
        <ChatItem key={chatInfo.id} chatInfo={chatInfo}></ChatItem>
      ))}
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  margin-top: 12px;
`;

export default ChatList;
