import { Navigate, RouteObject } from 'react-router-dom';
import FoodMenuPage from '../pages/FoodMenuPage';
import RegisterLoginPage from '../pages/RegisterLoginPage';
import AvailableLunchPage from '../pages/AvailableLunchPage';
import YourOrdersPage from '../pages/YourOrdersPage';
import RatingsPage from '../pages/RatingsPage';

export type NavLinkInfo = { pageIconUrl: string; desktopLinkText: string; mobileLinkText: string };

export type PageObject = RouteObject & {
  navLinkInfo?: NavLinkInfo;
  children?: (RouteObject & {
    navLinkInfo?: NavLinkInfo;
  })[];
};

type PagesConfig = {
  private: PageObject[];
  public: PageObject[];
};

const pagesConfig: PagesConfig = {
  private: [
    { index: true, element: <Navigate to="/food-menu" replace /> },
    {
      path: '/food-menu',
      navLinkInfo: {
        pageIconUrl: './src/assets/icons/menuOption/foodMenu.svg',
        desktopLinkText: 'Food Menu',
        mobileLinkText: 'Menu',
      },
      element: <FoodMenuPage />,
    },
    {
      path: '/available-lunch',
      navLinkInfo: {
        pageIconUrl: './src/assets/icons/menuOption/availableLunch.svg',
        desktopLinkText: 'Available Lunch',
        mobileLinkText: 'Available',
      },
      element: <AvailableLunchPage />,
    },
    {
      path: '/your-orders',
      navLinkInfo: {
        pageIconUrl: './src/assets/icons/menuOption/yourOrder.svg',
        desktopLinkText: 'Your Orders',
        mobileLinkText: 'Orders',
      },
      element: <YourOrdersPage />,
    },
    {
      path: '/ratings',
      navLinkInfo: {
        pageIconUrl: './src/assets/icons/menuOption/rating.svg',
        desktopLinkText: 'Ratings',
        mobileLinkText: 'Ratings',
      },
      element: <RatingsPage />,
    },
  ],
  public: [
    { index: true, element: <Navigate to="/login" replace /> },
    { path: '/login', element: <RegisterLoginPage /> },
    { path: '/register', element: <RegisterLoginPage /> },
  ],
};

export default pagesConfig;

export const getNavLinks = (): ({ path: string } & NavLinkInfo)[] =>
  pagesConfig.private
    .filter((configItem) => configItem.navLinkInfo)
    .map((configItem) => ({
      path: configItem.path!,
      pageIconUrl: configItem.navLinkInfo!.pageIconUrl,
      desktopLinkText: configItem.navLinkInfo!.desktopLinkText,
      mobileLinkText: configItem.navLinkInfo!.mobileLinkText,
    }));
