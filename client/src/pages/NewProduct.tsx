import TopBar from '@components/molecules/TopBar';
import React, { useRef, useState, useEffect } from 'react';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ImageBox, { EImageSize } from '@components/molecules/ImageBox';
import { COLOR } from '@constants/style';
import styled from '@emotion/styled';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { categoryList } from '@constants/categoryList';
import { authAtom } from '@stores/AuthRecoil';
import { useRecoilValue } from 'recoil';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { createProductAPI } from '@apis/product';

const NewProduct: React.FC = () => {
  const [fileList, setFileList] = useState<File[]>([]);
  const [urlList, setUrlList] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const Auth = useRecoilValue(authAtom);

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
  };

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

  // 입력값 정보
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>();
  const [content, setContent] = useState('');
  const [inputCheck, setInputCheck] = useState(false);

  const handleRemoveOnClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    e.preventDefault();
    const fileIndex = e.target as HTMLButtonElement;

    if (fileList.length === 1 && inputRef.current?.value) {
      inputRef.current.value = '';
    }

    setFileList(
      fileList.filter((_: File, index) => index !== parseInt(fileIndex.id, 10)),
    );
    setUrlList(
      urlList.filter(
        (_: string, index) => index !== parseInt(fileIndex.id, 10),
      ),
    );
  };

  const handleSubmit = () => {
    const newProduct = {
      title,
      price: price || 0,
      content,
      hit: 0,
      status: '판매중',
      userId: Auth?.id,
      locationId: Auth?.location1.id,
      categoryId: Number(selectedCategory),
    };

    const newPrice = price || 0;

    const productForm = new FormData();
    productForm.append('title', title);
    productForm.append('price', String(price));
    productForm.append('content', content);
    productForm.append('hit', String(0));
    productForm.append('status', '판매중');
    productForm.append('userId', String(Auth?.id));
    productForm.append('locationId', String(Auth?.location1.id));
    productForm.append('categoryId', String(selectedCategory));
    // productForm.append();

    //const formData = new FormData();
    fileList.map((file, index) => {
      productForm.append('files', file);
    });

    const result = createProductAPI(productForm);
  };

  useEffect(() => {
    if (title && price && content && selectedCategory) {
      setInputCheck(true);
    } else {
      setInputCheck(false);
    }
  }, [title, price, content, selectedCategory]);

  return (
    <div style={{ width: '100%' }}>
      <TopBar title='글쓰기'>
        {inputCheck ? (
          <CheckOutlinedIcon
            sx={{ color: COLOR.point }}
            onClick={handleSubmit}
          />
        ) : (
          <CheckOutlinedIcon />
        )}
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
              <AddPhotoAlternateOutlinedIcon />
              <span>{`${urlList.length}/10`}</span>
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

      <TextWrapper>
        <input
          placeholder='글 제목'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </TextWrapper>

      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>카테고리</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={selectedCategory}
          label='카테고리'
          onChange={handleChange}
        >
          {Object.entries(categoryList).map(([key, value]) => (
            <MenuItem key={value} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextWrapper>
        <input
          type='number'
          placeholder='₩ 가격(선택사항)'
          value={price || ''}
          onChange={({ target: { value } }) => setPrice(Number(value))}
        />
      </TextWrapper>
      <TextWrapper>
        <textarea
          rows={10}
          placeholder='게시글 내용을 작성해주세요.'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          // onChange={({ target: { value } }) => setContent(value)}
        ></textarea>
      </TextWrapper>

      <TextWrapper style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <FmdGoodOutlinedIcon />
        </div>
        <div>{Auth?.location1.region}</div>
      </TextWrapper>
    </div>
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

const TextWrapper = styled.div`
  border-bottom: solid 1px ${COLOR.background2};
  padding-top: 16px;
  padding-bottom: 16px;
  width: 100%;

  & input,
  textarea {
    width: 100%;
    height: 100%;
  }
`;

export default NewProduct;
