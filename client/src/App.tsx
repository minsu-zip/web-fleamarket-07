import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { theme } from '@constants/theme';
import { ThemeProvider } from '@mui/material/styles';
import GlobalStyle from '@src/GlobalStyles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Main,
  Category,
  LocationEdit,
  NewProduct,
  ProductDetail,
  SignUp,
  SignIn,
} from '@src/pages';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/category' element={<Category />} />
              <Route path='/locationEdit' element={<LocationEdit />} />
              <Route path='/newProduct' element={<NewProduct />} />
              <Route path='/productDetail' element={<ProductDetail />} />
              <Route path='/signUp' element={<SignUp />} />
              <Route path='/signIn' element={<SignIn />} />
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
