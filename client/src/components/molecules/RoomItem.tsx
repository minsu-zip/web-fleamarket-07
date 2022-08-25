import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { getTimeGapString } from '@utils/time';
import ImageBox, { EImageSize } from '@components/molecules/ImageBox';
import {
  COLOR,
  TEXT_LINK_SMALL,
  TEXT_SMALL,
  TEXT_X_SMALL,
} from '@constants/style';
import { css } from '@emotion/css';
function notificationsLabel(count: number) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }

  return `${count} notifications`;
}

// 웹 소켓과 합칠 시 타입을 새로 정의해야하므로 임시로 any 지정
const RoomItem = ({ chatInfo }: any) => {
  const {
    id,
    product_id,
    seller_id,
    buyer_id,
    buyer_name,
    chatCount,
    content,
    createdAt,
  } = chatInfo;

  return (
    <ContainerDiv onClick={() => null}>
      <div style={{ marginLeft: '24px' }}>
        <div
          className={css`
            ${TEXT_LINK_SMALL}
          `}
        >
          {buyer_name}
        </div>
        <ContentDiv>{content}</ContentDiv>
      </div>

      <RightWrapperDiv>
        <TimeDiv>{getTimeGapString(new Date(createdAt ?? 0))}</TimeDiv>
        <div aria-label={notificationsLabel(100)}>
          <Badge badgeContent={100} color='primary'>
            <ImageBox
              type={EImageSize.small}
              src='https://s3-alpha-sig.figma.com/img/54b8/d540/0023aa0261c1c7e888270baa62691e7f?Expires=1661731200&Signature=f7h9Gq-vEIE7DfGxjHanPdlax-7RmN0nh7xxSi4XPBrqID8Y5aVWOTj3tu5YaFEp0-uR8mr7~~hr6AKbGzi~rLC7diPsxgpCA-fIMeJUL0tX5Ah4gN0iroKtC5cENfe5Nnw7FVzmoNezzeV4ONiQe19Aj1lYdljGczcHY-p1oWgZ5s00KzXocjud3T6Y3kJyUs6SpTvlzKjXdY9zPOQeqDyTsoOgUGf6OFyoIyJBgchiIX0EqBNalUfv1262GGlXuWT4KZKWh4aXiJ3xmMgKpe15~nIgsn3J2qQ6t9WNb~vVfFbiD9uZBWu1rioZgBFC4ubgDgTRkUvDkR~nn4Gjww__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'
            ></ImageBox>
          </Badge>
        </div>
      </RightWrapperDiv>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${COLOR.line};
  height: 72px;
`;

const ContentDiv = styled.div`
  ${TEXT_SMALL};
  color: ${COLOR.background2};
  margin-top: 6px;
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TimeDiv = styled.div`
  ${TEXT_X_SMALL};
  color: ${COLOR.background2};
  margin: 3px 12px 0 0;
`;

const RightWrapperDiv = styled.div`
  display: flex;
  margin-right: 24px;
  /* align-items: center; */
`;
export default RoomItem;
