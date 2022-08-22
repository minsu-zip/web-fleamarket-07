import { TEXT_SMALL, COLOR } from '@constants/style';
import styled from '@emotion/styled';
import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';

interface IPros {
  open: boolean;
  handleOpen(): void;
  handleClose(): void;
  addLocation(locationName: string): void;
}

const LocationModal: React.FC<IPros> = ({
  open,
  handleOpen,
  handleClose,
  addLocation,
}) => {
  const [locationName, setLocationName] = useState('');

  const inputSubmit = () => {
    addLocation(locationName);
    setLocationName('');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <BoxWrapper>
        <div style={{ marginTop: '16px', marginLeft: '20px' }}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            우리 동네를 입력하세요
          </Typography>
          <Input
            placeholder='시∙구 제외, 동만 입력'
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
          ></Input>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ModalButton onClick={handleClose}>취소</ModalButton>
            <ModalButton onClick={inputSubmit}>확인</ModalButton>
          </div>
        </div>
      </BoxWrapper>
    </Modal>
  );
};

const Input = styled.input`
  border: 1px solid ${COLOR.offWhite};
  border-radius: 8px;
  width: 300px;
  height: 36px;
  margin-bottom: 4px;
  ${TEXT_SMALL};
`;

const BoxWrapper = styled(Box)({
  width: '350px',
  height: '132px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: COLOR.background,
  borderRadius: '10px',
});

const ModalButton = styled(Button)({
  color: 'black',
});

export default LocationModal;
