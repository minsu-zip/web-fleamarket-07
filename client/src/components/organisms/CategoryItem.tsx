import React from 'react';
import { IconButton, SvgIconTypeMap } from '@mui/material';
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import DesktopMacOutlinedIcon from '@mui/icons-material/DesktopMacOutlined'; // 디지털기기
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined'; // 가구/인테리어
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined'; // 게임/취미
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined'; // 생활/가공식품
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined'; // 스포츠/레저
import GirlOutlinedIcon from '@mui/icons-material/GirlOutlined'; //여성패션/잡화
import BoyOutlinedIcon from '@mui/icons-material/BoyOutlined'; // 남성패션/잡화
import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined'; //유아동
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined'; //뷰티/미용
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined'; //반려동물
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'; // 도서/티켓/음반
import YardOutlinedIcon from '@mui/icons-material/YardOutlined'; // 식물
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'; // 기타 중고물품
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { TEXT_SMALL, COLOR } from '@constants/style';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { categoryAtom } from '@stores/ActionInfoRecoil';
import { useNavigate } from 'react-router-dom';
import { SLIDE_STATE } from '@constants/slideStyle';

interface IProps {
  name: string;
  id: number;
}

interface MuiIconObject {
  [key: string]: OverridableComponent<SvgIconTypeMap> & { muiName: string };
}

const category: MuiIconObject = {
  전체: AllInclusiveOutlinedIcon,
  디지털기기: DesktopMacOutlinedIcon,
  '가구/인테리어': ChairOutlinedIcon,
  '게임/취미': SportsEsportsOutlinedIcon,
  '생활/가공식품': LocalDiningOutlinedIcon,
  '스포츠/레저': FitnessCenterOutlinedIcon,
  '여성패션/잡화': GirlOutlinedIcon,
  '남성패션/잡화': BoyOutlinedIcon,
  유아동: ChildCareOutlinedIcon,
  '뷰티/미용': AutoFixHighOutlinedIcon,
  반려동물: PetsOutlinedIcon,
  '도서/티켓/음반': MenuBookOutlinedIcon,
  식물: YardOutlinedIcon,
  '기타/중고물품': MoreHorizOutlinedIcon,
};

const CategortItem: React.FC<IProps> = ({ name, id }) => {
  const Icon = category[name] ?? (() => <></>);
  const navigate = useNavigate();
  const [categoryState, setCategoryState] = useRecoilState(categoryAtom);

  const handleClick = () => {
    setCategoryState(id);
    navigate('/', { state: { animate: SLIDE_STATE.LEFT } });
  };

  return (
    <ContainerDiv>
      <div
        style={
          categoryState === id ? { backgroundColor: `${COLOR.primary}` } : {}
        }
      >
        <IconButton onClick={handleClick}>
          <Icon sx={{ color: 'black', fontSize: '50px' }} />
        </IconButton>
      </div>
      <div
        className={css`
          ${TEXT_SMALL}
        `}
      >
        {name}
      </div>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default CategortItem;
