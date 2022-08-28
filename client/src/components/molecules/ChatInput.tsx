import React, { useState } from 'react';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { TChatSending } from '@fleamarket/common';
import styled from '@emotion/styled';
import { COLOR, TEXT_MEDIUM } from '@constants/style';

interface IProps {
  sendMessage: (chatContent: TChatSending) => void;
}

const ChatInput: React.FC<IProps> = ({ sendMessage }) => {
  const [content, setContent] = useState<string>('');

  // TODO : 내가 보낸 메세지를 받았을 때 대기 처리 없애기
  // TODO : 메세지를 서로가 읽었는 지 확인할 수 있는 로직
  const submitMessage = () => {
    if (content) {
      sendMessage({ content });
      setContent(``);
    }
  };

  return (
    <ContainerDiv>
      <InputTextArea
        placeholder={'당신의 매너가 사람을 만듭니다'}
        rows={2}
        className='input'
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submitMessage();
          }
        }}
      />
      <Button onClick={submitMessage}>
        <SendIcon sx={{ color: COLOR.title }} />
      </Button>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  width: 100%;
  padding: 0.75rem;

  display: flex;
  align-items: center;
  column-gap: 0.5rem;

  color: ${COLOR.title};
  background-color: ${COLOR.primary};
  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5),
    0px 2px 4px rgba(0, 0, 0, 0.25);

  & > button {
    flex: 0 0 auto;
    min-width: 40px;
    padding: 0.5rem 0;
  }
`;

const InputTextArea = styled.textarea`
  ${TEXT_MEDIUM}

  flex: 1;
  padding: 0.75rem;
  outline: none;
  border-radius: 5px;

  border: 1px solid transparent;
  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5),
    0px 2px 4px rgba(0, 0, 0, 0.25);

  resize: none;

  &:focus {
    border: 1px solid ${COLOR.title};
  }
`;

export default ChatInput;
