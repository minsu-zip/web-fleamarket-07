import React, { useState } from 'react';
import styled from '@emotion/styled';
import { COLOR, IMAGE_PROTECT_DRAGGABLE } from '@constants/style';
import { Skeleton } from '@mui/material';

const DEFAULT_IMAGE_PATH = '/defaultImage.png';

export enum EImageSize {
  small = 'SMALL',
  medium = 'MEDIUM',
  large = 'LARGE',
  full = 'FULL',
}

interface IProps extends React.PropsWithChildren {
  src?: string;
  type?: EImageSize;
  alt?: string;
}

const ImageBox: React.FC<IProps> = ({ src, type, alt = 'product' }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [source, setSource] = useState<string>(src ?? '');

  return (
    <ContainerDiv type={type}>
      {isLoading && <BoxSkeleton animation={'wave'} variant='rounded' />}
      <img
        src={source}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={() => setSource(DEFAULT_IMAGE_PATH)}
      />
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div<{ type?: EImageSize }>`
  flex: 0 0 auto;
  ${({ type }) => {
    switch (type) {
      case EImageSize.small:
        return `
          width: 2.5rem;
          height: 2.5rem;
        `;
      case EImageSize.medium:
        return `
          width: 4.75rem;
          height: 4.75rem;
        `;
      case EImageSize.full:
        return `
          width: 100%;
          aspect-ratio: 1/1;
        `;
      default:
        return `
          width: 6.625rem;
          height: 6.625rem;
        `;
    }
  }}

  ${({ type }) =>
    type !== EImageSize.full
      ? `
    border: 1px solid ${COLOR.line};
    border-radius: 8px;
  `
      : ''}
  
  background-color: ${COLOR.background};
  overflow: hidden;

  position: relative;

  & > img {
    ${IMAGE_PROTECT_DRAGGABLE}
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
  }
`;

const BoxSkeleton = styled(Skeleton)`
  width: 100%;
  height: 100%;
  position: absolute;
  &::after {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 0, 0, 0.04),
      transparent
    );
  }
`;

export default ImageBox;
