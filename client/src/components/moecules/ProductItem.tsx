import styled from '@emotion/styled';
import { TProduct } from '@fleamarket/common';
import { IconButton } from '@mui/material';
import Dir from './ImageLarge.png';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {
  TEXT_LINK_MEDIUM,
  TEXT_SMALL,
  TEXT_LINK_SMALL,
  COLOR,
} from '@constants/style';
import { css } from '@emotion/css';

interface IProps {
  product: TProduct;
}

const ProductItem: React.FC<IProps> = ({ product }) => {
  const { id, title, price, isLike, likes, chats, locationName } = product;

  return (
    <>
      <ContainerDiv>
        <div>
          <Image src={Dir}></Image>
        </div>
        <ContentDiv>
          <TitleHeader>
            <TitleSpan
              className={css`
                ${TEXT_LINK_MEDIUM}
              `}
            >
              {title}
            </TitleSpan>
            <IconButton>
              {isLike ? (
                <FavoriteIcon sx={{ color: COLOR.error }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </TitleHeader>

          <div>
            <span
              className={css`
                ${TEXT_SMALL}
              `}
            >
              {locationName} {`∙ 2분전`}
            </span>
          </div>

          <div style={{ paddingTop: '8px' }}>
            <span
              className={css`
                ${TEXT_LINK_SMALL}
              `}
            >
              {price === 0 ? '무료나눔' : price?.toLocaleString()}원
            </span>
          </div>

          <IconDiv>
            {chats && chats > 0 ? (
              <ChatWrapper
                className={css`
                  ${TEXT_SMALL}
                `}
              >
                <ChatBubbleOutlineIcon />
                <span>{chats}</span>
              </ChatWrapper>
            ) : null}

            {likes && likes > 0 ? (
              <ChatWrapper
                className={css`
                  ${TEXT_SMALL}
                `}
              >
                <FavoriteBorderIcon />
                <span>{likes}</span>
              </ChatWrapper>
            ) : null}
          </IconDiv>
        </ContentDiv>
      </ContainerDiv>
    </>
  );
};

const ContainerDiv = styled.div`
  display: flex;
  padding: 16px;
  width: 100%;
  height: 100%;
`;

const ContentDiv = styled.div`
  flex: 1;
  padding-left: 16px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const TitleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TitleSpan = styled.span`
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const ChatWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 18px;
`;
export default ProductItem;
