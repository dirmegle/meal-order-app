import { ReactNode, useContext, useEffect, useState } from 'react';
import IconButton from '../IconButton/IconButton';
import Close from '../../assets/icons/buttons/closeFilled.svg?react';
import BlankCard, { CardContent, CardHeader } from '../BlankCard/BlankCard';
import { CartContextValue } from '../../store/cartContextConfig';
import { priceFormat } from './orderSummaryUtils';
import CheckoutButtonDesktop from '../CheckoutButtons/CheckoutButtonDesktop';
import useIsMobile from '../../hooks/useIsMobile';
import CheckoutButtonMobile from '../CheckoutButtons/CheckoutButtonMobile';
import Confirmed from '../../assets/icons/buttons/checkoutButtons/checkDesktop.svg?react';
import { CartContext } from '../../store/CartContext';
import Modal, { ModalFooter } from '../Modal/Modal';
import DialogContent from '../DialogContent/DialogContent';
import DialogSuccess from '../../assets/icons/dialog/success.svg?react';
import Button from '../Button/Button';
import Warning from '../../assets/icons/toast/errorOutline.svg?react';
import { ToastContext, ToastContextValue } from '../../store/ToastContext';
import styles from './orderSummary.module.css';

export interface OrderSummaryProps {
  ordersNumber: number;
  children: ReactNode;
  onClick: () => void;
}

export default function OrderSummary({ ordersNumber, children, onClick }: OrderSummaryProps) {
  const { isMobile } = useIsMobile();
  const {
    isSubmited,
    setIsSubmited,
    setErrorMessage,
    updateUserOrders,
    errorMessage,
    totalCartPrice,
  } = useContext(CartContext) as CartContextValue;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToast, removeToast } = useContext(ToastContext) as ToastContextValue;

  useEffect(() => {
    if (isSubmited) {
      setIsModalOpen(true);
    }
  }, [isSubmited]);

  useEffect(() => {
    if (errorMessage) {
      const id = addToast({
        icon: <Warning />,
        children: errorMessage,
        toastType: 'warning',
        onClose: () => removeToast(id),
      });

      setErrorMessage('');
    }
  }, [errorMessage, addToast, setErrorMessage, removeToast]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsSubmited(false);
  };

  const renderModal = () => (
    <Modal
      modalHeadline="We've got your lunch order!"
      widthClass="small"
      onClose={handleModalClose}>
      <DialogContent icon={<DialogSuccess />}>
        <div>Your order is placed successfully.</div>
        <br />
        You can view your lunch for the week in <strong> Your Order.</strong>
      </DialogContent>
      <ModalFooter>
        <Button onClick={handleModalClose} size="medium" category="primary">
          Cool, Thanks!
        </Button>
      </ModalFooter>
    </Modal>
  );

  return (
    <>
      {/* {isToastOpen && renderToast()} */}
      {isModalOpen && renderModal()}
      <BlankCard className={styles.container}>
        <CardHeader className={styles.headline}>
          <span>Order Summary</span>
          <IconButton ariaLabel="Close" size="medium" category="tertiary" onClick={onClick}>
            <Close />
          </IconButton>
        </CardHeader>
        <CardContent className={styles.mappingBox}>{children}</CardContent>
        <div className={styles.totalPrice}>
          <div className={styles.priceText}>Total Price</div>
          <div className={styles.priceNumbers}>€{priceFormat(totalCartPrice)}</div>
        </div>
        <div className={styles.button}>
          {isMobile ? (
            <CheckoutButtonMobile
              submitedText="Confirmed!"
              textLeft="Release"
              textRight="Slide To Order"
              isSubmited={isSubmited}
              handleSubmit={() => updateUserOrders()}
              isDisabled={ordersNumber === 0}
            />
          ) : (
            <CheckoutButtonDesktop
              submitedText="Confirmed!"
              buttonText="Press & Hold to Send"
              isSubmited={isSubmited}
              handleSubmit={() => updateUserOrders()}
              submitedIcon={<Confirmed />}
              isDisabled={ordersNumber === 0}
            />
          )}
        </div>
      </BlankCard>
    </>
  );
}
