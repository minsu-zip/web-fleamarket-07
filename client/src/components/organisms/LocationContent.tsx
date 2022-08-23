import { TEXT_SMALL, COLOR } from '@constants/style';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useState } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationModal from '@components/molecules/LocationModal';

const LocationContent = () => {
  // 위치 데이터 전역에서 받아오기
  const [location, setLocation] = useState<string[]>(['역삼동', '강남구']);

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const addLocation = (locationName: string): void => {
    // locationName 추가 로직 및 API 요청 로직 작성
    if (location.length === 2) return;

    setLocation([...location, locationName]);
    setIsOpen(false);
  };

  const removeLocation = (index: number) => {
    // 지역 삭제
    if (location.length < 2) return;

    const newLocation = [...location];
    newLocation.splice(index, 1);
    setLocation([...newLocation]);
  };

  return (
    <ContainerDiv>
      <TextWrapperDiv>지역은 최소 1개 이상</TextWrapperDiv>
      <TextWrapperDiv>최대 2개까지 설정 가능해요.</TextWrapperDiv>
      <ButtonWrapperDiv>
        {location.map((item, index) => (
          <IconButton
            key={item}
            size='large'
            variant='contained'
            endIcon={location.length === 1 && <DeleteIcon />}
            onClick={() => removeLocation(index)}
          >
            {item}
          </IconButton>
        ))}

        {location.length < 2 && (
          <IconButton
            variant='outlined'
            endIcon={<AddOutlinedIcon />}
            sx={{ color: COLOR.title, borderColor: COLOR.title }}
            onClick={handleOpen}
          >
            지역 추가
          </IconButton>
        )}
      </ButtonWrapperDiv>

      <LocationModal
        isOpen={isOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        addLocation={addLocation}
      />
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div``;

const TextWrapperDiv = styled.div`
  ${TEXT_SMALL};
  color: ${COLOR.background2};
  text-align: center;
  margin-bottom: 8px;
`;

const ButtonWrapperDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
`;

const IconButton = styled(Button)({
  width: '160px',
});

export default LocationContent;
