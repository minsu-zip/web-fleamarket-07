import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import styled from '@emotion/styled';
import ImageBox, { EImageSize } from '@components/molecules/ImageBox';
import { EProductStatus, TProductDetail } from '@fleamarket/common';
import Dropdown from '@components/molecules/Dropdown';
import {
  COLOR,
  SCROLLBAR_THUMB,
  TEXT_LARGE,
  TEXT_LINK_SMALL,
  TEXT_MEDIUM,
  TEXT_X_SMALL,
} from '@constants/style';
import { getTimeGapString } from '@utils/time';
import { css } from '@emotion/css';
import { productUpdateAPI } from '@apis/product';

interface IProps {
  details: TProductDetail;
  authId?: number;
}

const ProductContent: React.FC<IProps> = ({ details, authId }) => {
  const {
    title,
    content,
    images,
    categoryName,
    createdAt,
    rooms,
    likes,
    hit,
    userName,
    locationName,
    userId,
    id,
  } = details;

  const [status, setStatus] = useState(String(details.status));

  const handleClick = async (value: string) => {
    setStatus(value);
    await productUpdateAPI({ productId: id, productStatus: value });
  };

  return (
    <>
      <Carousel
        className='carousel'
        indicatorContainerProps={{
          style: {
            position: 'relative',
            marginTop: '-40px',
            paddingBottom: '18px',
            zIndex: 10,
          },
        }}
      >
        {images?.map((url, index: number) => (
          <ImageBox
            key={index}
            src={url}
            alt={'products'}
            type={EImageSize.full}
          />
        ))}
      </Carousel>

      <ContentDiv>
        {userId === authId ? (
          <Dropdown
            dropDownList={Object.values(EProductStatus).filter(
              (k) => k !== status,
            )}
            handleClick={handleClick}
          >
            <DropdownDiv>{status}</DropdownDiv>
          </Dropdown>
        ) : (
          <span
            className={css`
              ${TEXT_LARGE}
            `}
          >
            {status}
          </span>
        )}

        <h3 className='title'>{title}</h3>
        <span className='sub_title'>
          {categoryName}
          <span>∙</span>
          {getTimeGapString(new Date(createdAt ?? 0))}
        </span>
        <p className='content'>{content}</p>
        <span className='sub_title'>
          채팅 {rooms}
          <span>∙</span>
          관심 {likes}
          <span>∙</span>
          조회 {hit}
        </span>
        <WriterInfoDiv>
          <h4 className='guide'>판매자 정보</h4>
          <div className='user'>{userName}</div>
          <span className='location'>{locationName}</span>
        </WriterInfoDiv>
      </ContentDiv>
    </>
  );
};

const ContentDiv = styled.div`
  width: 100%;
  padding: 2rem 1rem;

  & > .title {
    ${TEXT_LARGE}
    margin: 1rem 0 0.5rem 0;
  }

  & > .sub_title {
    ${TEXT_X_SMALL}
    color: ${COLOR.placeholder};
  }

  & > .content {
    ${TEXT_MEDIUM}
    color: ${COLOR.titleActive};
    white-space: pre-wrap;
    line-height: 1.75rem;
  }
`;

const DropdownDiv = styled.div`
  ${TEXT_LINK_SMALL}
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 1rem 0.25rem 1rem;
  gap: 0.5rem;

  border: 1px solid ${COLOR.label};
  border-radius: 8px;
`;

const WriterInfoDiv = styled.div`
  ${TEXT_LINK_SMALL}
  width: 100%;
  margin-top: 1.5rem;
  padding: 1rem;

  display: flex;
  align-items: center;

  background-color: ${COLOR.background};

  & > .guide {
    flex: 0 0 auto;
    margin: 0;
  }
  & > .user {
    ${SCROLLBAR_THUMB}
    flex: 1;
    margin: 0 0.5rem;
    overflow-x: overlay;
    overflow-y: hidden;
    white-space: nowrap;

    text-align: end;
  }
  & > .location {
    ${TEXT_X_SMALL}
    flex: 0 0 auto;
    color: ${COLOR.label};
  }
`;

export default ProductContent;
