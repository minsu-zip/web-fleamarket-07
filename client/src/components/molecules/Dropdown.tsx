import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { COLOR } from '@constants/style';

interface IProps {
  dropDownList?: string[];
  children: React.ReactNode;
  handleClick: (value: string) => void;
}

const Dropdown: React.FC<IProps> = ({
  children,
  dropDownList,
  handleClick,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value: string) => () => {
    setAnchorEl(null);
    handleClick(value);
  };

  return (
    <div>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpen}
        sx={{ color: 'black', padding: 0 }}
      >
        {children}
      </Button>
      <Menu
        id='basic-menu'
        sx={{
          marginTop: '0.5rem',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {dropDownList?.map((item, index) => (
          <MenuItem key={item} onClick={handleClose(item)}>
            {item !== '삭제하기' ? (
              item
            ) : (
              <span style={{ color: COLOR.error }}>{item}</span>
            )}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Dropdown;
