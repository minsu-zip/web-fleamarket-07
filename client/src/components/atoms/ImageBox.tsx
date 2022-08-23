import React from 'react';
import styled from '@emotion/styled';
import { COLOR, IMAGE_PROTECT_DRAGGABLE } from '@constants/style';

export enum EImageSize {
  small = 'SMALL',
  medium = 'MEDIUM',
  large = 'LARGE',
}

interface IProps extends React.PropsWithChildren {
  src?: string;
  type?: EImageSize;
  alt?: string;
}

const ImageBox: React.FC<IProps> = ({ src, type, alt = 'product' }) => {
  return (
    <ContainerDiv type={type}>
      <img src={src} alt={alt} />
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div<{ type?: EImageSize }>`
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
      default:
        return `
          width: 6.625rem;
          height: 6.625rem;
        `;
    }
  }}

  border: 1px solid ${COLOR.line};
  border-radius: 8px;
  background-color: ${COLOR.placeholder};
  overflow: hidden;

  & > img {
    ${IMAGE_PROTECT_DRAGGABLE}
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default ImageBox;
