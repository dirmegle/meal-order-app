import PrivateRoute from './PrivateRoute';
import SignedUserPagesLayout from '../layouts/SignedUserPagesLayout';
import RegisterLoginPage from '../pages/RegisterLoginPage';
import pagesConfig from './PagesConfig';
import CartContextProvider from '../store/CartContext';
import ToastContextProvider from '../store/ToastContext';

const routerConfig = [
  {
    path: '/',
    element: (
      <PrivateRoute>
        <ToastContextProvider>
          <CartContextProvider>
            <SignedUserPagesLayout />
          </CartContextProvider>
        </ToastContextProvider>
      </PrivateRoute>
    ),
    errorElement: <>404 not found page</>,
    children: pagesConfig.private,
  },
  {
    path: '/',
    element: (
      <ToastContextProvider>
        <RegisterLoginPage />
      </ToastContextProvider>
    ),
    children: pagesConfig.public,
  },
];

export default routerConfig;
