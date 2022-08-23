import LocationContent from '@components/organisms/LocationContent';
import TopBar from '@components/molecules/TopBar';
import React from 'react';

const LocationEdit: React.FC = () => {
  return (
    <>
      <TopBar title='내 동네 설정하기' />
      <div style={{ marginTop: '40px' }}>
        <LocationContent />
      </div>
    </>
  );
};

export default LocationEdit;
