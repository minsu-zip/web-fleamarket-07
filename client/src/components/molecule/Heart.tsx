import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import { COLOR } from '@constants/style';

interface IProps {
  isLike: boolean;
  onClick?(event: React.MouseEvent<HTMLDivElement>): void;
}

const Heart: React.FC<IProps> = ({ isLike, onClick }) => {
  return (
    <div onClick={onClick}>
      <IconButton>
        {isLike ? (
          <FavoriteIcon sx={{ color: COLOR.error }} />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>
    </div>
  );
};

export default Heart;
