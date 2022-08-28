import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { COLOR } from '@constants/style';

interface IProps {
  id?: string;
  dropDownList?: string[];
  children: React.ReactNode;
  handleClick: (value: string, id: string) => void;
}

const Dropdown: React.FC<IProps> = ({
  children,
  dropDownList,
  handleClick,
  id,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value: string, id: string) => () => {
    setAnchorEl(null);
    handleClick(value, id);
  };

  return (
    <div id={id}>
      <Button
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
          <MenuItem key={item} onClick={handleClose(item, id ? id : '')}>
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
