import ImageBox, { EImageSize } from '@components/molecules/ImageBox';
import { COLOR } from '@constants/style';
import styled from '@emotion/styled';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

interface IProps {
  handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void;
  handleRemoveOnClick(e: React.MouseEvent<HTMLButtonElement>): void;
  fileList: File[];
  urlList: string[];
}

const ImageUpload: React.FC<IProps> = ({
  handleFileChange,
  handleRemoveOnClick,
  fileList,
  urlList,
}) => {
  return (
    <Container>
      <div className='wrapper'>
        <Box>
          <UploadBox>
            <input
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
  );
};

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;

  & > .wrapper {
    width: 100%;
    padding-bottom: 1.5rem;
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
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
export default ImageUpload;
