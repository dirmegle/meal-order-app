import { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames/bind';
import UserCard from '../components/UserCard/UserCard';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import useUserProfile from '../hooks/useUserProfile';
import OrderSummary from '../components/OrderSummary/OrderSummary';
import { CartContext } from '../store/CartContext';
import { CartContextValue } from '../store/cartContextConfig';
import CartOrdersList from '../components/CartOrdersList/CartOrdersList';
import { LoadingScreen } from '../components/LoadingAnimation/LoadingAnimation';
import styles from './signedUserPagesLayout.module.css';

const cx = classNames.bind(styles);

export default function SignedUserPagesLayout() {
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const { isLoadingScreenVisible } = useUserProfile();
  const { updatedOrders, setOrderChange, cartCount, userProfile } = useContext(
    CartContext
  ) as CartContextValue;
  const { id, name, surname, img, balance } = userProfile;

  const toggleSummaryVisibility = () => {
    setIsSummaryVisible(!isSummaryVisible);
  };

  return (
    <>
      {isLoadingScreenVisible && <LoadingScreen />}
      <div className={styles.container}>
        <Navigation />
        <div className={styles.subContainer}>
          <main className={styles.main}>
            <aside className={cx('asideWrap', { expanded: isSummaryVisible })}>
              {userProfile && (
                <UserCard
                  key={id}
                  name={name}
                  lastName={surname}
                  imgSrc={img}
                  balance={balance || 0}
                  cartCount={cartCount}
                  isCartOpen={isSummaryVisible}
                  onClick={toggleSummaryVisibility}
                />
              )}
              <article className={styles.orderSummary}>
                {isSummaryVisible && (
                  <OrderSummary ordersNumber={cartCount} onClick={toggleSummaryVisibility}>
                    <CartOrdersList
                      orders={updatedOrders}
                      setRemoveOrder={setOrderChange}
                      ordersNumber={cartCount}
                    />
                  </OrderSummary>
                )}
              </article>
            </aside>
            <div className={styles.content}>
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
