import React, { useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { TChatSending } from '@fleamarket/common';
import styled from '@emotion/styled';
import { COLOR, TEXT_MEDIUM } from '@constants/style';

interface IProps {
  sendMessage: (chatContent: TChatSending) => void;
}

const ChatInput: React.FC<IProps> = ({ sendMessage }) => {
  const textareaRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState<string>('');

  // TODO : 내가 보낸 메세지를 받았을 때 대기 처리 없애기
  // TODO : 메세지를 서로가 읽었는 지 확인할 수 있는 로직
  const submitMessage = () => {
    if (content) {
      sendMessage({ content });
      setContent(``);
      if (textareaRef.current) console.log(textareaRef.current.value);
    }
  };

  return (
    <ContainerDiv>
      <TextField
        inputRef={textareaRef}
        sx={{
          '& > div': {
            backgroundColor: COLOR.white,
          },
        }}
        placeholder={'당신의 매너가 사람을 만듭니다'}
        color='primary'
        maxRows={2}
        multiline
        className='input'
        variant='outlined'
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
  ${TEXT_MEDIUM}
  width: 100%;
  padding: 0.75rem;

  display: flex;
  align-items: center;
  column-gap: 0.5rem;

  color: ${COLOR.title};
  background-color: ${COLOR.primary};
  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5),
    0px 2px 4px rgba(0, 0, 0, 0.25);

  & > .input {
    flex: 1;
  }

  & > div > div {
    padding: 0.75rem;
  }
  & > button {
    flex: 0 0 auto;
    min-width: 40px;
    padding: 0.5rem 0;
  }
`;

export default ChatInput;
