import { Global, css } from '@emotion/react';

const GlobalStyle = () => (
  <Global
    styles={css`
      @import url(‘https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap’);
      html,
      body,
      #root {
        width: 100%;
        height: 100%;
      }
      body {
        margin: 0;
        font-size: 14px;
        font-family: 'Noto Sans KR';
        user-select: none;
        font-weight: normal;
        font-style: normal;

        max-width: 412px;
        height: 100%;
        margin: 0 auto;
      }
      #root {
        overflow: hidden;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-top: 0;
      }
      a {
        color: inherit;
        text-decoration: none;
        outline: none;
      }
      input,
      textarea,
      button {
        border: 0;
        padding: 0;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        border-radius: 0;
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
      }
      * {
        box-sizing: border-box;
      }
    `}
  />
);

export default GlobalStyle;
