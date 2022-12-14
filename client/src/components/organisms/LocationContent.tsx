import { TEXT_SMALL, COLOR } from '@constants/style';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useState } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationModal from '@components/molecules/LocationModal';
import { locationAtom } from '@stores/ActionInfoRecoil';
import { useRecoilState } from 'recoil';
import { createLocationAPI, deleteLocationAPI } from '@apis/location';
import { keyframes } from '@emotion/css';

const LocationContent = () => {
  // 위치 데이터 전역에서 받아오기
  const [location, setLocation] = useRecoilState(locationAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deletingLocation, setDeletingLocation] = useState<number>(-1);

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const addLocation = async (locationName: string): Promise<void> => {
    if (location.length === 2) return;

    setIsLoading(true);
    try {
      const locations = await createLocationAPI({ region: locationName });
      setLocation(locations);

      setIsLoading(false);
      setIsOpen(false);
    } catch (e) {
      // TODO : Loading Error Toast Message
      setIsLoading(false);
    }
  };

  const removeLocation = async (index: number) => {
    // 지역 삭제
    if (location.length < 2) return;

    setDeletingLocation(index);
    try {
      const { id: locationId } = location[index];
      const locations = await deleteLocationAPI({ id: locationId });
      setLocation(locations);

      setDeletingLocation(-1);
      setIsOpen(false);
    } catch (e) {
      // TODO : Loading Error Toast Message
      setDeletingLocation(-1);
    }

    const newLocation = [...location];
    newLocation.splice(index, 1);
    setLocation([...newLocation]);
  };

  return (
    <ContainerDiv>
      <TextWrapperDiv>지역은 최소 1개 이상</TextWrapperDiv>
      <TextWrapperDiv>최대 2개까지 설정 가능해요.</TextWrapperDiv>
      <ButtonWrapperDiv>
        {location.map(
          ({ id, region }: { id: number; region: string }, index: number) => {
            if (index === deletingLocation) return <BoxSkeleton key={id} />;

            return (
              <IconButton
                key={id}
                size='large'
                variant='contained'
                endIcon={location.length > 1 && <DeleteIcon />}
                onClick={() => removeLocation(index)}
              >
                {region}
              </IconButton>
            );
          },
        )}

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
        isLoading={isLoading}
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
  padding: 2rem 1rem;

  column-gap: 2rem;
`;

const IconButton = styled(Button)({
  flex: 1,
});

const skeletonKeyframe = keyframes`
  0% {
      background-color: rgba(165, 165, 165, 0.1);
  }

  50% {
      background-color: rgba(165, 165, 165, 0.3);
  }

  100% {
      background-color: rgba(165, 165, 165, 0.1);
  }
`;

const BoxSkeleton = styled.div`
  flex: 1;
  padding: 8px 22px;
  animation: ${skeletonKeyframe} 1.8s infinite ease-in-out;
  border-radius: 8px;
`;

export default LocationContent;
