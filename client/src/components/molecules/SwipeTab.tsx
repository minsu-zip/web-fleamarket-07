import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { COLOR, SCROLLBAR_THUMB } from '@constants/style';
import SwipeableViews from 'react-swipeable-views';

const SelectionContext = createContext<number>(0);

const SwipeTab = ({ children }: PropsWithChildren) => {
  const theme = useTheme();
  const [selection, setSelection] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelection(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setSelection(index);
  };

  const panels = React.Children.toArray(children)
    .map((child) => {
      if (!React.isValidElement(child)) return <></>;
      if (typeof child.type === 'string') return <></>;
      if (!child.props.label) return <></>;

      return child;
    })
    .filter((c) => c.type.name === 'Panel');

  return (
    <SelectionContext.Provider value={selection}>
      <ContainerDiv>
        <AppBar position='relative'>
          <Tabs
            sx={{ backgroundColor: COLOR.background }}
            value={selection}
            onChange={handleChange}
            TabIndicatorProps={{ style: { backgroundColor: COLOR.body } }}
            textColor='inherit'
            variant='fullWidth'
            aria-label='full width tabs example'
          >
            {panels.map(({ props }) => {
              const label = props?.label ?? '';

              return <Tab key={label} label={label} />;
            })}
          </Tabs>
        </AppBar>
        <SwipeViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          containerStyle={{
            transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s',
          }}
          index={selection}
          onChangeIndex={handleChangeIndex}
        >
          {panels.map((panel, index) =>
            React.cloneElement(panel, { ...panel.props, index }),
          )}
        </SwipeViews>
      </ContainerDiv>
    </SelectionContext.Provider>
  );
};

interface ITabProps extends PropsWithChildren {
  label: string;
  dir?: string;
  index?: number;
}

const Panel = ({ children, index, label, ...other }: ITabProps) => {
  const selection = useContext(SelectionContext);

  return (
    <div
      role='tabpanel'
      hidden={selection !== index}
      aria-labelledby={`full-width-tab-${selection}`}
      {...other}
    >
      {selection === index && <>{children}</>}
    </div>
  );
};

const ContainerDiv = styled.div`
  overflow: hidden;
  flex: 1;

  display: flex;
  flex-direction: column;
`;

const SwipeViews = styled(SwipeableViews)`
  flex: 1;
  overflow-y: hidden;

  & > div {
    height: 100%;
  }

  & > div > div {
    overflow-y: hidden !important;
  }

  & > div > div > div {
    ${SCROLLBAR_THUMB}
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: scroll;
  }
`;

SwipeTab.Panel = Panel;
export default SwipeTab;
