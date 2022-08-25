import TopBar from '@components/molecules/TopBar';
import React, { useRef, useState } from 'react';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

import ImageBox, { EImageSize } from '@components/molecules/ImageBox';
import { COLOR } from '@constants/style';
import styled from '@emotion/styled';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

const NewProduct: React.FC = () => {
  const [fileList, setFileList] = useState<File[]>([]);
  const [urlList, setUrlList] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files || [];
    if (files.length < 11 && urlList.length + files.length < 11) {
      const fileData: File[] = [];
      const urlData: string[] = [];
      Array.from(files).forEach((file: File) => {
        fileData.push(file);
        urlData.push(URL.createObjectURL(file));
      });
      setFileList((prevState: File[]) => [...fileData, ...prevState]);
      setUrlList((prevState: string[]) => [...urlData, ...prevState]);
    } else {
      alert('파일 갯수 10개를 초과하였습니다!');
    }
  };

  const handleRemoveOnClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    e.preventDefault();
    const fileIndex = e.target as HTMLButtonElement;

    console.log('aa');
    if (fileList.length === 1 && inputRef.current?.value) {
      inputRef.current.value = '';
    }
    console.log('bb');

    setFileList(
      fileList.filter((_: File, index) => index !== parseInt(fileIndex.id, 10)),
    );
    setUrlList(
      urlList.filter(
        (_: string, index) => index !== parseInt(fileIndex.id, 10),
      ),
    );
  };

  return (
    <>
      <TopBar title='글쓰기'>
        <CheckOutlinedIcon />
      </TopBar>

      <Container>
        <div className='wrapper'>
          <Box>
            <UploadBox>
              <input
                ref={inputRef}
                type='file'
                accept='.jpg, .jpeg, .png'
                onChange={handleFileChange}
              ></input>
              <span>{`${urlList.length}/10`}</span>
              <AddPhotoAlternateOutlinedIcon />
            </UploadBox>
          </Box>
          {fileList?.length !== 0 &&
            fileList.map((_, index) => (
              <Box key={urlList[index]}>
                <CloseWrapper id={String(index)} onClick={handleRemoveOnClick}>
                  X
                </CloseWrapper>
                <ImageBox
                  type={EImageSize.medium}
                  src={urlList[index]}
                ></ImageBox>
              </Box>
            ))}
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;

  & > .wrapper {
    width: 100%;
    display: flex;
    overflow-x: scroll;
  }
`;
const Box = styled.div`
  width: 5rem;
  height: 5rem;
  margin: 0.5rem;
  position: relative;
`;
const CloseWrapper = styled.button`
  background: ${COLOR.titleActive};
  border-radius: 0.75rem;
  padding: 0.2rem;
  right: -0.4rem;
  top: -0.4rem;
  position: absolute;
  width: 1rem;
  height: 1rem;
  font-size: 0.5rem;
  text-align: center;
  color: ${COLOR.offWhite};
  z-index: 1;
`;
const UploadBox = styled.div`
  min-width: 5rem;

  & input {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
  }

  border-radius: 0.5rem;
  background-color: ${COLOR.placeholder};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default NewProduct;
