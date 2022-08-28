import TopBar from '@components/molecules/TopBar';
import React, { useRef, useState, useEffect } from 'react';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { COLOR } from '@constants/style';
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

const NewProduct: React.FC = () => {
  const Auth = useRecoilValue(authAtom);
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
    console.log(Auth?.location1.id);

    productForm.append('title', title);
    productForm.append('price', String(price));
    productForm.append('content', content);
    productForm.append('userId', String(Auth?.id));
    productForm.append('locationId', String(Auth?.location1.id));
    productForm.append('categoryId', String(selectedCategory));

    fileList.forEach((file) => {
      productForm.append('files', file);
    });

    await createProductAPI(productForm);
    navigate('/');
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
      {inputCheck ? (
        <TopBar title='글쓰기' onClick={handleSubmit}>
          <CheckOutlinedIcon sx={{ color: COLOR.point }} />
        </TopBar>
      ) : (
        <TopBar title='글쓰기'>
          <CheckOutlinedIcon />
        </TopBar>
      )}
      <div style={{ marginTop: '30px' }}>
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
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label' sx={{ paddingTop: '10px' }}>
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
      <Footer style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <FmdGoodOutlinedIcon />
        </div>
        <div>{Auth?.location1.region}</div>
      </Footer>
    </div>
  );
};

const TextWrapper = styled.div`
  border-bottom: solid 1px ${COLOR.background2};
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
  padding-left: 20px;
  & input,
  textarea {
    width: 100%;
    height: 100%;
  }
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  align-items: center;
  width: 100%;
  padding: 1rem;
`;

export default NewProduct;
