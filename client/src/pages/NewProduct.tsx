import TopBar from '@components/molecules/TopBar';
import React, { useRef, useState, useEffect } from 'react';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { COLOR, SCROLLBAR_THUMB } from '@constants/style';
import styled from '@emotion/styled';
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
import ImageUpload from '@components/organisms/ImageUpload';
import { useNavigate } from 'react-router-dom';
import { locationAtom } from '@stores/ActionInfoRecoil';
import { SLIDE_STATE } from '@constants/slideStyle';

const NewProduct: React.FC = () => {
  const Auth = useRecoilValue(authAtom);
  const locations = useRecoilValue(locationAtom);
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<File[]>([]);
  const [urlList, setUrlList] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>();
  const [content, setContent] = useState('');
  const [inputCheck, setInputCheck] = useState(false);

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

  const handleSubmit = async () => {
    const productForm = new FormData();

    productForm.append('title', title);
    productForm.append('price', String(price));
    productForm.append('content', content);
    productForm.append('userId', String(Auth?.id));
    productForm.append('locationId', String(locations[0].id));
    productForm.append('categoryId', String(selectedCategory));

    fileList.forEach((file) => {
      productForm.append('files', file);
    });

    await createProductAPI(productForm);
    navigate('/', { state: { animate: SLIDE_STATE.DOWN } });
  };

  useEffect(() => {
    if (title && price && content && selectedCategory) {
      setInputCheck(true);
    } else {
      setInputCheck(false);
    }
  }, [title, price, content, selectedCategory]);

  return (
    <ContainerDiv>
      <TopBar title='글쓰기' onClick={() => inputCheck && handleSubmit()}>
        <CheckOutlinedIcon
          sx={{
            color: inputCheck ? COLOR.point : '',
            cursor: inputCheck ? 'pointer' : '',
          }}
        />
      </TopBar>
      <div className='contents'>
        <ImageUpload
          handleFileChange={handleFileChange}
          fileList={fileList}
          urlList={urlList}
          handleRemoveOnClick={handleRemoveOnClick}
        />
        <TextWrapper>
          <input
            placeholder='글 제목'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </TextWrapper>
        <TextWrapper>
          <FormControl fullWidth>
            <InputLabel
              id='demo-simple-select-label'
              sx={{ paddingTop: '10px' }}
            >
              카테고리
            </InputLabel>
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
        </TextWrapper>
        <TextWrapper>
          <input
            type='number'
            placeholder='₩ 가격(선택사항)'
            value={price || ''}
            onChange={({ target: { value } }) => {
              setPrice(Number(value));
            }}
          />
        </TextWrapper>
        <TextWrapper>
          <textarea
            rows={10}
            placeholder='게시글 내용을 작성해주세요.'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </TextWrapper>
      </div>
      <span className='footer'>
        <FmdGoodOutlinedIcon />
        {locations[0].region}
      </span>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  & > .contents {
    ${SCROLLBAR_THUMB}
    flex: 1;
    padding: 1.5rem 1rem;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  & > .footer {
    flex: 0 0 auto;
    width: 100%;
    padding: 1rem;

    display: flex;
    align-items: center;
    column-gap: 1rem;
  }
`;

const TextWrapper = styled.div`
  width: 100%;
  padding: 2rem 1rem;
  &:last-child {
    margin-bottom: 0;
  }

  border-bottom: solid 1px ${COLOR.line};

  & input,
  textarea {
    width: 100%;
    height: 100%;
    padding: 1rem;
    border: 1px solid ${COLOR.line};
    border-radius: 0.5rem;
    resize: none;
  }
`;

export default NewProduct;
