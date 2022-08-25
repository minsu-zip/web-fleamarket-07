export const COLOR = Object.freeze({
  primary: '#f7e500',
  primary2: '#F8F400',
  primary3: '#ffe100',
  title: '#3a1d1d',
  point: '#002bef',
  titleActive: '#1E2019',
  body: '#626666',
  label: '#8D9393',
  placeholder: '#C1C5C5',
  line: '#CCD3D3',
  background: '#F5F5F5',
  background2: '#888888',
  offWhite: '#FCFCFC',
  error: '#F45452',
  lightError: '#FFD4D3',
  darkError: '#CD6766',
  white: '#ffffff',
  orange: '#ffa000',
});

export const TEXT_LARGE = `
  font-family: 'Noto Sans KR';
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
`;

export const TEXT_MEDIUM = `
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
`;

export const TEXT_BODY_REGULAR = `
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
`;

export const TEXT_SMALL = `
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
`;

export const TEXT_X_SMALL = `
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
`;

export const TEXT_LINK_MEDIUM = `
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
`;

export const TEXT_LINK_SMALL = `
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
`;

export const TEXT_LINK_X_SMALL = `
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
`;

export const IMAGE_PROTECT_DRAGGABLE = `
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`;

export const SCROLLBAR_THUMB = `
  scrollbar-gutter: stable both-edges;
  &::-webkit-scrollbar {
    width: 2px;
    height: 2px;
    background-color: transparent;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      padding-top: -2px;
      border-radius: 10px;
      background-color: ${COLOR.title};
    }
  }
`;

export const TEXT_ELLIPSIS = `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
